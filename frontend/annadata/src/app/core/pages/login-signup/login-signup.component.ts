import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServices } from '../../services/Login.services';
import { User } from '../../model/User';
import { Router } from '@angular/router'; // Make sure to import this
import { NgIf } from '@angular/common';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit{
  constructor( private LoginServices:LoginServices ,private router: Router,  private userService: UserService ){}


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

     confirmPassword: string = '';

     loginEmailTouched: boolean = false;
     loginPasswordTouched: boolean = false;
     nameTouched: boolean = false;
     emailTouched: boolean = false;
     passwordTouched: boolean = false;
     confirmPasswordTouched: boolean = false;
     phoneTouched: boolean = false;
   
     passwordCriteria = {
       minLength: false,
       uppercase: false,
       lowercase: false,
       number: false,
       specialChar: false,
     };
   
   
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
          sessionStorage.setItem('user', JSON.stringify(data.user));
          this.userService.setUser(data.user);
          if(data.status){
            this.router.navigate(['/home']); 
          }
        }
      )
     }


}
