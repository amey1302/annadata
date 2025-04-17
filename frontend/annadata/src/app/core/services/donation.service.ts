import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../model/Donation.model';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { ApiResponse } from '../model/ApiResponse.model';
import { DonationSave } from '../model/DonationSave.model';
@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  saveDonation(obj:DonationSave):Observable<ApiResponse>{
    console.log(obj);
      return this.http.post<ApiResponse>(environment.api_url+Constant.API_END_POINT.ADD_DONATION, obj);
  }

  getDonationList():Observable<Donation[]>{
    return this.http.get<Donation[]>(environment.api_url+Constant.API_END_POINT.GET_DONATION);
  }

  getDonationById(id:string){
    return this.http.get<Donation>(environment.api_url+Constant.API_END_POINT.GET_DONATION+'/'+id);
  }

  searchDonation(location:string){

    return this.http.get<Donation[]>(environment.api_url+Constant.API_END_POINT.SEARCH_DONATION+location);
  }
  deleteDonationById(id:string){
    return this.http.delete<string>(environment.api_url+Constant.API_END_POINT.DELETE_DONATION+"/"+id);
  }

  updateDonationById(obj: DonationSave){
    return this.http.put<ApiResponse>(environment.api_url+Constant.API_END_POINT.ADD_DONATION, obj);
  }
}

