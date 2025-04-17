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
  }
  

  
}
