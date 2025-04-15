import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { RouterModule } from '@angular/router';
import { Donation } from '../../model/Donation.model';
import { DonationService } from '../../services/donation.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-donor-home',
  standalone: true,
  imports: [NavbarComponent, CardComponent, RouterModule, NgFor, FormsModule],
  templateUrl: './donor-home.component.html',
  styleUrl: './donor-home.component.scss'
})
export class DonorHomeComponent {
  public donationObj : Donation = new Donation();
  donations! : Donation[];
  
    constructor(private donationService:DonationService){
  
    }
    ngOnInit(): void {
      this.donationService.getDonationList().subscribe((res:Donation[])=>{
        this.donations = res;
      })
      console.log(this.donations)
    }
}
