import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../model/Donation.model';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { ApiResponse } from '../model/ApiResponse.model';
@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  saveDonation(obj:Donation):Observable<ApiResponse>{
      return this.http.post<ApiResponse>(environment.api_url+Constant.API_END_POINT.ADD_DONATION, obj);
  }

  getDonationList():Observable<Donation[]>{
    return this.http.get<Donation[]>(environment.api_url+Constant.API_END_POINT.GET_DONATION);
  }

  getDonationById(id:string){
    return this.http.get<Donation>(environment.api_url+Constant.API_END_POINT.GET_DONATION+'/'+id);
  }

  searchDonation(location:string){
    return this.http.get<Donation[]>(environment.api_url+Constant.API_END_POINT.SEARCH_DONATION);
  }
  deleteDonationById(){

  }

  updateDonationById(){

  }
}

