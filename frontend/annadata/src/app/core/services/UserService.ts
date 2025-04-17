import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    private Currentuser:User | null = null
    constructor() {
        const user = sessionStorage.getItem('user');
        
        if (user) {
            this.Currentuser = JSON.parse(user) 
        }
     }

     setUser(user: User) {
        this.Currentuser = user;
        sessionStorage.setItem('user', JSON.stringify(user));
     }
     getUser(): User | null {
        return this.Currentuser;
      }
      clearUser() {
        this.Currentuser = null;
        sessionStorage.removeItem('user');
      }
  }