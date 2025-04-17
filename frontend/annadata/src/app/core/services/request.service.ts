import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestSave } from '../model/RequestSave.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }
// saveDonation(obj:DonationSave):Observable<ApiResponse>{
//     console.log(obj);
//       return this.http.post<ApiResponse>(environment.api_url+Constant.API_END_POINT.ADD_DONATION, obj);
//   }

    saveRequest(obj:RequestSave):Observable<ApiResponse>{
      return this.http.post<ApiResponse>(environment.api_url+ Constant.API_END_POINT.ADD_REQUEST, obj);
    }
}
