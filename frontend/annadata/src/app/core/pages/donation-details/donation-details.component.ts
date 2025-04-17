import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../Pipe/safe-url.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DonationService } from '../../services/donation.service';
import { FormsModule } from '@angular/forms';
import { Donation } from '../../model/Donation.model';
import { Router } from '@angular/router';
import { RequestSave } from '../../model/RequestSave.model';
declare var bootstrap: any;

@Component({
  selector: 'app-donation-details',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, HttpClientModule, FormsModule],
  templateUrl: './donation-details.component.html',
  styleUrl: './donation-details.component.scss'
})
export class DonationDetailsComponent implements OnInit{
  donation: Donation = new Donation();
  timeRemaining: string = '';
  donorInitials = '';
  request : RequestSave = new RequestSave();
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private donationService:DonationService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.donationService.getDonationById(id!).subscribe({
      next:(res) => this.donation = res,
    })

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


  saveRequest(){
    
  }


  updateDonation() {
    
  }
  
  showDeleteModal: boolean = false;
  donationToDeleteId: string = '';

deleteDonation(id: string) {
  this.donationToDeleteId = id;
  this.showDeleteModal = true;
}

confirmDelete() {
  this.donationService.deleteDonationById(this.donationToDeleteId).subscribe({
    next: () => {
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

}
