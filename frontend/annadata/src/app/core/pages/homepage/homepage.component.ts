import { Component, OnInit , signal} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Donation } from '../../model/Donation.model';
import { DonationService } from '../../services/donation.service';
import { ApiResponse } from '../../model/ApiResponse.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/User';
import { UserService } from '../../services/UserService';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, CardComponent,RouterModule,NgFor, HttpClientModule, FormsModule, NgIf, NgClass, SlicePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {
  donations! : Donation[];
  allDonations: Donation[] = [];
  searchedLocation : string = '';
  selectedFilter = signal<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  constructor(private donationService:DonationService , private userService:UserService ){

  }
   loginuser! : User;
   isLoading: boolean = true;

  ngOnInit(): void {
    // document.body.style.overflow = 'hidden';
  // ⏳ Wait at least 1 second before hiding splash
  const splashShown = sessionStorage.getItem('splashShown');

  if (!splashShown && this.isLoading) {
    this.isLoading = true;
    
    setTimeout(() => {
      sessionStorage.setItem('splashShown', 'true');
      this.getDonation();
      this.isLoading = false;
    }, 2500); // splash duration in milliseconds (1.5 sec)
  } else {
    this.getDonation();
    this.isLoading = false; // Skip splash screen
  }

  
    const userData= this.userService.getUser();
    // console.log('calling servuce->',this.userService.getUser());
    
    if(userData){
      this.loginuser = userData;
    }
    // console.log(this.loginuser);
 
  }
  noDonationFound = false;
  applyFilter() {
    const filter = this.selectedFilter();
    
    if (filter === 'ALL') {
      // console.log(filter);
      this.donations = [...this.allDonations];
    } else {
      console.log(filter)
      this.donations = this.allDonations.filter(d => d.foodType === filter);
    }
    // console.log(this.donations)
    this.noDonationFound = this.donations.length === 0;
  }

  filterBy(type: 'ALL' | 'VEG' | 'NON_VEG') {
    this.selectedFilter.set(type);
    this.applyFilter();
  }
  getDonation(){
    this.donationService.getDonationList().subscribe((res:Donation[])=>{
     
      this.allDonations = res.filter((donation: Donation) => donation.status === 'OPEN');

      this.donations = res.filter((donation:Donation)=>donation.status==='OPEN');
      this.isLoading = false; // 👈 hide splash when data is ready

      // console.log("All Donations Fetched:", this.allDonations);
      this.applyFilter();
    })
  }
  searchedDonation :Donation[] = [];  
  
  search() {
    const location = this.searchedLocation.trim();
    if (!location) {
      this.getDonation();
    } else {
      this.donationService.searchDonation(location).subscribe((res: Donation[]) => {
        res = res.filter((donation:Donation)=>donation.status==='OPEN');
        if(res.length===0){
          this.noDonationFound= true;
          this.donations = res;
        }else{
          this.noDonationFound= false;
           let temp= res.filter((donation:Donation)=>donation.status==='OPEN');
          this.allDonations = temp;
        this.applyFilter();
        }
        
      });
    }
  }

}
