import { Component ,OnInit, ViewChild  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/UserService';
import { User } from '../../model/User';
import { CommonModule, NgClass, NgIf, TitleCasePipe } from '@angular/common'; // ✅ import this
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule, PopupComponent, TitleCasePipe, NgIf, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService, private router:Router){}
  loginuser!: User | null;
    ngOnInit(): void {
     
      const userData = this.userService.getUser();
      console.log('From navbar ngOnInit:', userData);
      this.loginuser = userData;
      // this.loginuser = userData ?? null; 
      
    }

    @ViewChild('popup') popupComponent!: PopupComponent;
    logout(){
      this.popupComponent.open('Are you sure you want to logout?', 'confirm', () => {
       
        console.log("logout");
        this.userService.clearUser();
        this.router.navigate(['/home'])
      });
    }
}
