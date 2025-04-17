import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Donation } from '../../model/Donation.model';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HttpClientModule , DatePipe, NgStyle, NgClass, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() donation! : Donation;
  hover: boolean = false;
  constructor(private router:Router){
  }
  viewDonationDetails(id: string) {
    this.router.navigate(['/donation', id]);
  }
}
