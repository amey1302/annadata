import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
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
  imports: [NavbarComponent, CardComponent,RouterModule,NgFor, HttpClientModule, FormsModule, NgIf],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {
  donations! : Donation[];
  searchedLocation : string = '';
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
    console.log('calling servuce->',this.userService.getUser());
    
    if(userData){
      this.loginuser = userData;
    }
    console.log(this.loginuser);
 
  }
  noDonationFound = false;
  getDonation(){
    this.donationService.getDonationList().subscribe((res:Donation[])=>{

      this.donations = res.filter((donation:Donation)=>donation.status==='OPEN');
      this.isLoading = false; // 👈 hide splash when data is ready

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
          this.donations = res.filter((donation:Donation)=>donation.status==='OPEN');
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