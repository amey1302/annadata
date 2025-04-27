import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginServices } from '../../services/Login.services';
import { User } from '../../model/User';
import { Router } from '@angular/router'; // Make sure to import this

import { NgClass, NgIf } from '@angular/common';

import { UserService } from '../../services/UserService';
import { PopupComponent } from '../../components/popup/popup.component';


@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, PopupComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent implements OnInit{

  activeTab = 'login'; // Default tab is Login

  constructor( private LoginServices:LoginServices ,private router: Router,  private userService: UserService ){}



  users : User[]=[]  //to fetch all users
     signupdata={
       name: '',
       email: '',
       password: '',
       phoneNumber: '',
      //  role: 'DONOR'  // DONOR   RECIVER

       role: '',
     }

     Logindata={
       email: '',
       password: ''
     }


     ngOnInit(): void {
     
      // this.LoginServices.getUserList().subscribe({
      //   next:(data)=>{
      //     this.users = data
        
      //   }
      // })
     }

     loginEmailTouched: boolean = false;
     loginPasswordTouched: boolean = false;
     nameTouched: boolean = false;
     emailTouched: boolean = false;
     passwordTouched: boolean = false;
     confirmPasswordTouched: boolean = false;
     phoneTouched: boolean = false;
   
     confirmPassword: string = '';
   
     passwordCriteria = {
       minLength: false,
       uppercase: false,
       lowercase: false,
       number: false,
       specialChar: false,
     };
   

     checkPasswordStrength() {
      const password = this.signupdata.password;
      this.passwordCriteria.minLength = password.length >= 8;
      this.passwordCriteria.uppercase = /[A-Z]/.test(password);
      this.passwordCriteria.lowercase = /[a-z]/.test(password);
      this.passwordCriteria.number = /[0-9]/.test(password);
      this.passwordCriteria.specialChar = /[!@#$%^&*()_+=\-]/.test(password);
    }
  
    fieldTextType: boolean = false;



toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
   
@ViewChild('popup') popupComponent! :PopupComponent;
     signup(){
        this.LoginServices.saveUser(this.signupdata).subscribe({

          next:(data)=>{
            this.popupComponent.open('You have successfully registered.', 'success')
            this.activeTab = 'login';
            this.signupdata={
              name: '',
              email: '',
              password: '',
              phoneNumber: '',
             //  role: 'DONOR'  // DONOR   RECIVER
       
              role: '',
            }
          },
          error:(err)=>{
            this.errorMessage.set(err.error);
            setTimeout(() => {
              this.errorMessage.set('');
            }, 3000);
          }
        })
        
     }
     errorMessage = signal('');
     login(){
      this.LoginServices.loginUser(this.Logindata).subscribe({
        next: (data)=>{
          this.popupComponent.open('Logged in successfully', 'success');
          sessionStorage.setItem('user', JSON.stringify(data.user));
          this.userService.setUser(data.user);
          if(data.status){
            if(data.user.role==='DONOR'){
              this.router.navigate(['/donor/homepage']);
            }else{
              this.router.navigate(['/home']); 
            }
           
          }
          this.Logindata={
            email: '',
            password: ''
          }
        },
        error:(err)=>{
          this.errorMessage.set(err.error.message);
          setTimeout(() => {
            this.errorMessage.set('');
          }, 3000);
        }
     })
     }


}
