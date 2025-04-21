import { Component, Input , signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Donation } from '../../model/Donation.model';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { UserService } from '../../services/UserService';
import { User } from '../../model/User';
import {RequestService} from '../../services/request.service'

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
  constructor(private router:Router ,private userService:UserService, private requestService: RequestService){
  }
  loginUser! : User|null;
   numberofrequest = signal(0)
  ngOnInit(): void {
    this.loginUser = this.userService.getUser();
    // console.log(this.loginUser);
    
     this.getrequestNumber(this.donation.id)
  }
  viewDonationDetails(id: string) {
    this.router.navigate(['/donation', id]);
  }

  

  getrequestNumber(id :string){
    this.requestService.getRequestList(id).subscribe({

      next: (response) => {
        // console.log("Request List:", response);
        const pendingreq = response.filter((req: any)=> req.status==='PENDING')
        this.numberofrequest.set( pendingreq.length);
        // You can handle the response here
      },
      error: (error) => {
        console.error("Error fetching request list:", error);
      },
      // complete: () => {
      //   console.log("Request list fetch completed.");
      // }
  
    })
  }
}
