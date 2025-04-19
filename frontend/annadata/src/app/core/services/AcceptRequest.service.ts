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

export class AcceptRequestService {

  constructor(private http:HttpClient) { }
  AcceptRequest(donationid:string):Observable<any>{
    return this.http.put<ApiResponse>(environment.api_url + '/donor/requests/'+donationid+'/accept',{});
    // return this.http.put<ApiResponse>(`${environment.api_url}/donor/requests/${donationid}/accept`, {});
}

  CollectionRequest(donationid:string,  status: string):Observable<any>{
    // return this.http.put<ApiResponse>(environment.api_url + '/donor/requests/'+donationid+'/collect-status',{});
    return this.http.put<any>( `${environment.api_url}/donor/requests/${donationid}/collect-status?status=${status}`, {})

  }
}

//  /food-donation/api/v1/donor     /requests/{id}/accept