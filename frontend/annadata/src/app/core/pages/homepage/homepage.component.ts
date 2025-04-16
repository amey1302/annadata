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
  constructor(private donationService:DonationService){

  }
  ngOnInit(): void {
    this.donationService.getDonationList().subscribe((res:Donation[])=>{
      this.donations = res;
    })
   
  }
  searchedDonation :Donation[] = [];  
  search(){
    this.donationService.searchDonation(this.searchedLocation).subscribe((res:Donation[])=>{
      this.searchedDonation = res;
    });
  }
}
