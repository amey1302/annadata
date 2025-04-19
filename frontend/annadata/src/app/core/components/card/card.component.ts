import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Donation } from '../../model/Donation.model';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { UserService } from '../../services/UserService';
import { User } from '../../model/User';

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
  constructor(private router:Router ,private userService:UserService){
  }
  loginUser! : User|null;
  ngOnInit(): void {
    this.loginUser = this.userService.getUser();
    console.log(this.loginUser);
    
  }
  viewDonationDetails(id: string) {
    this.router.navigate(['/donation', id]);
  }
}
