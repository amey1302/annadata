import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../model/Donation.model';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { ApiResponse } from '../model/ApiResponse.model';
import { User } from '../model/User';
import { Login } from '../model/Login';
import {UserService} from './UserService';
@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  constructor(private http: HttpClient ) { }

//   saveDonation(obj:Donation):Observable<ApiResponse>{
//       return this.http.post<ApiResponse>(environment.api_url+Constant.API_END_POINT.User, obj);
//   }

//   getUserList():Observable<User[]>{
//     return this.http.get<User[]>(environment.api_url+Constant.API_END_POINT.User);
//   }

    getUserList():Observable<User[]>{
      return this.http.get<User[]>(environment.api_url+Constant.API_END_POINT.User);
    }

    saveUser(User:User):Observable<ApiResponse>{
      return this.http.post<ApiResponse>(environment.api_url+Constant.API_END_POINT.User, User);
    }

    loginUser( Login :Login):Observable<ApiResponse>{
      return this.http.post<ApiResponse>(environment.api_url+"/login", Login);
    }
  
}


