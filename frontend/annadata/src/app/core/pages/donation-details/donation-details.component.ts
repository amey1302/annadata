import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
declare var bootstrap: any;

@Component({
  selector: 'app-donation-details',
  standalone: true,
  //  imports: [CommonModule, SafeUrlPipe, HttpClientModule, FormsModule,RouterModule],
  imports: [CommonModule, SafeUrlPipe, HttpClientModule, FormsModule, PopupComponent,RouterModule],

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

     private userService: UserService
    ) 

// =======
//      private userService: UserService,
//     ) 
    { 
      this.user =  this.userService.getUser()!;
    }
    user: User = new User();
    id :string = '';
// >>>>>>> main
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id!;
    this.donationService.donation$.subscribe((donation)=>{
      this.donation = donation;
    })
    this.request.receiverId = this.userService.getUser()?.id;
    this.loginuser = this.userService.getUser();
    console.log(this.loginuser);
    
    console.log(this.request.receiverId);
    
    this.donationService.loadDonationById(id!);

    this.calculateCountdown();
    this.setDonorInitials();
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
  quantity : number =0;
  openEditQuantityModal(){
    this.quantity =  this.donation.quantity
    const modalElement = document.getElementById('editQuantityModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  updateQuantity(){
    this.popupComponent.open('Are you sure you want to update','confirm', ()=>{
      this.donationService.updateQuantity(this.donation.id, this.quantity).subscribe({
        next: ()=>{
          this.donationService.loadDonationById(this.id)
          this.popupComponent.open('Successfully updated the quantity', 'success');
        }
      })
    })
    
  }
  saveRequest() {
    this.request.donationId = this.donation.id;

    this.request.receiverId = this.user.id!;
    
    console.log(this.request.quantityRequested);
    this.requestService.saveRequest(this.request).subscribe({
      next: (res) =>{
        console.log(res.data);
      }
    })
  }



  showDeleteModal: boolean = false;
  donationToDeleteId: string = '';

  deleteDonation(id: string) {
    this.donationToDeleteId = id;
    this.showDeleteModal = true;
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
