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
import { User } from '../../model/User';
import { UserService } from '../../services/UserService';
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
 
    constructor(private donationService:DonationService, private sanitizer: DomSanitizer, private userService: UserService){

      this.user = this.userService.getUser()!;
  
    }
    ngOnInit(): void {
      this.donationService.donations$.subscribe((donations)=>{
        this.donations = donations;
      })
      //this.getDonationByDonor();
      
      this.donationService.loadDonationByDonor(this.user.id!);
     // this.getDonation();
    }
    // getDonation(){
    //   this.donationService.getDonationList().subscribe((res:Donation[])=>{
    //     this.donations = res;
    //   });
    // }
    user : User = new User();
    getDonationByDonor(){
     

      if(this.user!=null){
        
        this.donationService.getDonationByDonorId(this.user.id!).subscribe({
          next:(res)=>{
            this.donations = res;
            console.log(res);
          }
        })
      }
      
    }
    onSaveDonation(){
      this.donationObj.donorId = this.user?.id!;
      
      this.donationService.saveDonation(this.donationObj).subscribe({
        next: (res) => {
          console.log('POST Success:', res),
          this.donationService.loadDonationByDonor(this.user.id!);
        } ,
        error: (err) => console.error('POST Error:', err)
      });
      this.donationService.loadDonationByDonor(this.user.id!);
    }
    hasOpenedGoogleMaps: boolean = false;
    openGoogleMaps() {
      if (!this.hasOpenedGoogleMaps) {
        const userConfirmed = confirm(
          "You'll be redirected to Google Maps. Select a location, copy the link or address, then paste it here."
        );
    
        if (userConfirmed) {
          window.open('https://www.google.com/maps', '_blank');
          this.hasOpenedGoogleMaps = true;
        }
      }
    }
    // mapUrl: SafeResourceUrl | null = null;
    // getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       const lat = position.coords.latitude;
    //       const lng = position.coords.longitude;
    //       const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    //       this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    //       this.donationObj.addressLink =    this.mapUrl;
    //     }, (error) => {
    //       alert('Location permission denied or unavailable.');
    //     });
    //   } else {
    //     alert('Geolocation is not supported by this browser.');
    //   }
    // }
}
