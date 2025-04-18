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

  getDonationByDonorId(id:string){
    return this.http.get<Donation[]>(environment.api_url+ Constant.API_END_POINT.GET_DONATION_BY_DONOR+id);
  }
  searchDonation(location:string){

    return this.http.get<Donation[]>(environment.api_url+Constant.API_END_POINT.SEARCH_DONATION+location);
  }
  deleteDonationById(id:string) : Observable<string>{
    return this.http.delete<string>(environment.api_url+Constant.API_END_POINT.DELETE_DONATION+"/"+id,{ responseType: 'text' as 'json' });
  }

  updateDonationById(id:string, obj: DonationSave){
    return this.http.put<ApiResponse>(environment.api_url+Constant.API_END_POINT.ADD_DONATION+"/"+id, obj);
  }

  updateQuantity(donationID:string, quantity:number){
   let  obj = {
      "quantity": quantity
    }
    return this.http.put<ApiResponse>(environment.api_url+Constant.API_END_POINT.UPDATE_QUANTITY+donationID+"/update-quantity", obj);
  }
}

