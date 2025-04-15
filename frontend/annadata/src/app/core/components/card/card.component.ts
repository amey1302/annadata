import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Donation } from '../../model/Donation.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HttpClientModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() donation! : Donation;
  constructor(){
    console.log("here");
    console.log(this.donation)
  }
}
