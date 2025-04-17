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
  ngOnInit(): void {

    
   this.getDonation();
  }
  noDonationFound = false;
  getDonation(){
    this.donationService.getDonationList().subscribe((res:Donation[])=>{

      this.donations = res.filter((donation:Donation)=>donation.status==='OPEN');
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
