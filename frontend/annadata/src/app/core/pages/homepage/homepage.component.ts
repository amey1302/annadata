import { Component, OnInit , signal} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
  imports: [NavbarComponent, CardComponent,RouterModule,NgFor, HttpClientModule, FormsModule, NgIf, NgClass],
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
  ngOnInit(): void {
    const userData= this.userService.getUser();
    console.log('calling servuce->',this.userService.getUser());
    
    if(userData){
      this.loginuser = userData;
    }
    console.log(this.loginuser);
    
    
   this.getDonation();
  }
  noDonationFound = false;
  applyFilter() {
    const filter = this.selectedFilter();
    
    if (filter === 'ALL') {
      console.log(filter);
      this.donations = [...this.allDonations];
    } else {
      console.log(filter)
      this.donations = this.allDonations.filter(d => d.foodType === filter);
    }
    console.log(this.donations)
    this.noDonationFound = this.donations.length === 0;
  }

  filterBy(type: 'ALL' | 'VEG' | 'NON_VEG') {
    this.selectedFilter.set(type);
    this.applyFilter();
  }
  getDonation(){
    this.donationService.getDonationList().subscribe((res:Donation[])=>{
     
      this.allDonations = res.filter((donation: Donation) => donation.status === 'OPEN');

      console.log("All Donations Fetched:", this.allDonations);
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

/*
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgFor } from '@angular/common';
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
  imports: [NavbarComponent, CardComponent,RouterModule,NgFor, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {
  donations! : Donation[];
  searchedLocation : string = '';
  constructor(private donationService:DonationService , private userService:UserService ){

  }
   loginuser! : User;
  ngOnInit(): void {
    const userData= this.userService.getUser();
    // console.log('calling servuce->',this.userService.getUser());
    
    if(userData){
      this.loginuser = userData;
    }
    
    this.donationService.getDonationList().subscribe((res:Donation[])=>{
      this.donations = res;
    })
    // console.log('login user- > ', this.loginuser);
    console.log(this.loginuser);
  }
  
   
  
}

*/