import { Component, Signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { RouterModule } from '@angular/router';
import { DonationSave } from '../../model/DonationSave.model';
import { Donation } from '../../model/Donation.model';
import { DonationService } from '../../services/donation.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { DomSanitizer , SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-donor-home',
  standalone: true,
  imports: [NavbarComponent, CardComponent, RouterModule, NgFor, FormsModule],
  templateUrl: './donor-home.component.html',
  styleUrl: './donor-home.component.scss'
})
export class DonorHomeComponent {
  public donationObj : DonationSave = new DonationSave();
  donations! : Donation[];
  userId = signal("77c2e050-d0ca-4023-95b8-7b9c7f6a2995");
    constructor(private donationService:DonationService, private sanitizer: DomSanitizer){
  
    }
    ngOnInit(): void {
      this.getDonation();
    }
    getDonation(){
      this.donationService.getDonationList().subscribe((res:Donation[])=>{
        this.donations = res;
      });
    }
    onSaveDonation(){
      this.donationObj.donorId = this.userId()
      
      this.donationService.saveDonation(this.donationObj).subscribe({
        next: (res) => console.log('POST Success:', res),
        error: (err) => console.error('POST Error:', err)
      });
      this.getDonation();
    }

    mapUrl: SafeResourceUrl | null = null;
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          this.donationObj.addressLink =    this.mapUrl;
        }, (error) => {
          alert('Location permission denied or unavailable.');
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }
}
