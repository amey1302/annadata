import { Component ,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/UserService';
import { User } from '../../model/User';
import { CommonModule } from '@angular/common'; // ✅ import this

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService){}
  loginuser!: User | null;
    ngOnInit(): void {
     
      const userData = this.userService.getUser();
      console.log('From navbar ngOnInit:', userData);
      this.loginuser = userData;
      // this.loginuser = userData ?? null; 
      
    }
}
