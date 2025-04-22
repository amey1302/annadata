import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../Pipe/safe-url.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DonationService } from '../../services/donation.service';
import { FormsModule } from '@angular/forms';
import { Donation } from '../../model/Donation.model';
import { Router } from '@angular/router';
import { RequestSave } from '../../model/RequestSave.model';
import { RequestService } from '../../services/request.service';
import { RouterModule } from '@angular/router';
// import { UserService } from '../../services/UserService';
// import {User} from '../../model/User'
import { UserService } from '../../services/UserService';
import { User } from '../../model/User';
import { PopupComponent } from '../../components/popup/popup.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
declare var bootstrap: any;
type StatusType = 'OPEN' | 'CLOSED' | 'PENDING'; 
@Component({
  selector: 'app-donation-details',
  standalone: true,
  //  imports: [CommonModule, SafeUrlPipe, HttpClientModule, FormsModule,RouterModule],

  imports: [CommonModule, SafeUrlPipe, HttpClientModule, FormsModule, PopupComponent,RouterModule, NavbarComponent],


  templateUrl: './donation-details.component.html',
  styleUrl: './donation-details.component.scss'
})
export class DonationDetailsComponent implements OnInit {
  donation: Donation = new Donation();
  timeRemaining: string = '';
  donorInitials = '';
  request: RequestSave = new RequestSave();
  @ViewChild('popup') popupComponent!: PopupComponent;
      loginuser! : User|null
  constructor(
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer, 
    private donationService: DonationService,
     private router: Router, 
     private requestService: RequestService,

     private userService: UserService,
    ) { 
      

      this.user =  this.userService.getUser()!;
      if(this.user===null){
        this.user  = new User();
      }
    }
    
    user: User;
    id :string = '';
    statusDon:string = ''
  ngOnInit(): void {
    this.setMinDateTime();
    this.user =  this.userService.getUser()!;
    if(this.user===null){
      this.user  = new User();
    }
    
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id!;
    this.donationService.donation$.subscribe((donation)=>{
      this.donation = donation;
    })
    this.statusDon = this.donation.status;
    this.request.receiverId = this.userService.getUser()?.id;
    this.loginuser = this.userService.getUser();
    console.log(this.loginuser);
    
    console.log(this.request.receiverId);
    
    this.donationService.loadDonationById(id!);

    this.calculateCountdown();
    this.setDonorInitials();
  }

 

  statusOptions: StatusType[] = ['CLOSED'];

  updateStatus(newStatus: StatusType) {
    //this.donation.status = newStatus;
    if(newStatus==='CLOSED'){
      this.donationService.updateStatus(this.donation.id).subscribe({
        next:()=>{
          this.donationService.loadDonationById(this.donation.id);
        }
      });
    }
    
  }

  setDonorInitials() {
    const name = this.donation?.donorName || '';
    this.donorInitials = name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  calculateCountdown() {
    setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(this.donation?.expiryTime).getTime();
      const distance = expiry - now;

      if (distance > 0) {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        this.timeRemaining = `${hours}h ${minutes}m`;
      } else {
        this.timeRemaining = 'Expired';
      }
    }, 60000);
  }



  editableDonation: any = {};

  openEditModal(donation: any) {
    this.editableDonation = { ...donation };
    const modalElement = document.getElementById('editDonationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  titleTouched: boolean = false;
  descTouched: boolean = false;
  quantityTouched: boolean = false;
  
  updateDonation() {
    this.popupComponent.open('Are you sure want to update the changes', 'confirm', ()=>{
      this.donationService.updateDonationById(this.donation.id, this.editableDonation).subscribe({
        next:()=> {
          this.donationService.loadDonationById(this.id);
          this.popupComponent.open('Updated successfully','success');
        },

      })
    })
    
  }
  quantityEdit :number = 0;
  openEditQuantityModal(){
    this.quantityEdit = this.donation.quantity;
    const modalElement = document.getElementById('editQuantityModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  minDateTime: string = '';
  setMinDateTime(): void {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 
    this.minDateTime = now.toISOString().slice(0, 16); 
    console.log(this.minDateTime)
  }
  
  isFutureTimeValid(): boolean {
    if (!this.editableDonation.expiryTime) return false;
    const now = new Date();
    const selected = new Date(this.editableDonation.expiryTime);
    return selected.getTime() > now.getTime();
  }
  
  updateQuantity(){
    this.popupComponent.open('Are you sure you want to update','confirm', ()=>{
      this.donationService.updateQuantity(this.donation.id, this.quantityEdit).subscribe({
        next: ()=>{
          this.donationService.loadDonationById(this.id)
          this.popupComponent.open('Successfully updated the quantity', 'success');
        }
      })
    })
    
  }
  getMapUrl(address: string): string {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${query}&output=embed`;
  }
  saveRequest() {
    this.request.donationId = this.donation.id;

    this.request.receiverId = this.user.id!;
    
    console.log(this.request.quantityRequested);
    this.requestService.saveRequest(this.request).subscribe({
      next: (res) =>{
        console.log(res.data);
      },
      error:(err)=>{
       this.popupComponent.open(err.error.error,'error');
        
      }
    })
  }



  showDeleteModal: boolean = false;
  donationToDeleteId: string = '';

  deleteDonation(id: string) {
    this.donationToDeleteId = id;
    this.popupComponent.open('Are you sure want to delete this donation', 'confirm', ()=>{
      this.donationService.deleteDonationById(this.donationToDeleteId).subscribe({
        next: (res) => {
          //console.log(res);
          // this.showDeleteModal = false;
          this.router.navigate(['/donor/homepage']);
        },
        error: err => {
          console.error('Delete failed:', err);
          
        }
      });
    })
  }

  confirmDelete() {
    this.donationService.deleteDonationById(this.donationToDeleteId).subscribe({
      next: (res) => {
        console.log(res);
        this.showDeleteModal = false;
        this.router.navigate(['/donor/homepage']).then(success => {
          if (success) {
            console.log('Navigation success');
          } else {
            console.log('Navigation failed');
          }
        });
      },
      error: err => {
        console.error('Delete failed:', err);
        this.showDeleteModal = false;
      }
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }

  viewRequestPage() {
    // this.router.navigate(['/donation', this.donation.id, '/request']);
    this.router.navigate(['/donation', this.donation.id, 'request']);

  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

}
