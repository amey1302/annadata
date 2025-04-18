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
       role: 'RECEIVER'  // DONER
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

            if (data.status) {
              sessionStorage.setItem('user', JSON.stringify(data.User));
              this.router.navigate(['/home']);
            }
            else {
              console.error('Signup failed:', data.message);
            }
            console.log('signnup data',data);
          },
          error: (err) => {
            console.error('Signup failed:', err);
          }
        })
     }

     login(){
      this.LoginServices.loginUser(this.Logindata).subscribe(
        (data)=>{
          if (data.status) {
            // Store user in session if login is successful
            sessionStorage.setItem('user', JSON.stringify(data.User));
            this.router.navigate(['/home']);
          } else {
            // Display error message if login failed
            console.error('Login failed:', data.message);
            // this.toastr.error(data.message);  // Assuming you use toastr for error notification
          }
          // console.log(data);
        }
      )
     }


}
