import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServices } from '../../services/Login.services';
import { User } from '../../model/User';
import { Router } from '@angular/router'; // Make sure to import this

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit{
  constructor( private LoginServices:LoginServices ,private router: Router){}


  users : User[]=[]  //to fetch all users
     signupdata={
       name: '',
       email: '',
       password: '',
       phoneNumber: '',
       role: 'RECIVER'
     }

     Logindata={
       email: '',
       password: ''
     }


     ngOnInit(): void {
      this.LoginServices.getUserList().subscribe({
        next:(data)=>{
          this.users = data
          console.log('this are users',this.users);
        }
      })
     }


     signup(){
        this.LoginServices.saveUser(this.signupdata).subscribe({

          next:(data)=>{
            console.log(data);
          }
        })
     }

     login(){
      this.LoginServices.loginUser(this.Logindata).subscribe(
        (data)=>{
          sessionStorage.setItem('user', JSON.stringify(data.User));
          if(data.status){
            this.router.navigate(['/home']); 
          }
          // console.log(data);
        }
      )
     }


}
