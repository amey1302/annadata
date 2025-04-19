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
    getRequestList(donationId: string):Observable<any>{
      return this.http.get<RequestSave[]>(environment.api_url+'/donor/donations/'+ donationId+ '/requests') ;
    }

    getRequestListReceiver(receiverId: string):Observable<any>{
      // return this.http.get<RequestSave[]>(`environment.api_url+'/receiver/requests?receiverId=${receiverId}`) ;
      return this.http.get<any>(
        `${environment.api_url}/receiver/requests?receiverId=${receiverId}`
      );

    }
}
//   /food-donation/api/v1/donor         /donations/{donationId}/requests 

// /food-donation/api/v1/receiver    /requests