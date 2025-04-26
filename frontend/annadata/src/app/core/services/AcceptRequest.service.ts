import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestSave } from '../model/RequestSave.model';
import { Observable,BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})

export class AcceptRequestService {

  private requestListBevaragesSubject = new BehaviorSubject<RequestSave[]>([])
   prequetListBevarages$ = this.requestListBevaragesSubject.asObservable()


  constructor(private http:HttpClient) { }
  AcceptRequest(donationid:string,Status: string):Observable<any>{
    if(Status == 'accept'){
      return this.http.put<ApiResponse>(environment.api_url + '/donor/requests/'+donationid+'/accept',{});
    }else{
      return this.http.put<ApiResponse>(environment.api_url + '/donor/requests/'+donationid+'/reject',{});
    }
    // return this.http.put<ApiResponse>(environment.api_url + '/donor/requests/'+donationid+'/accept',{});
    // return this.http.put<ApiResponse>(`${environment.api_url}/donor/requests/${donationid}/accept`, {});
}

CollectionRequest(donationId: string): Observable<any> {
  const status = 'COLLECTED';
  return this.http.put<any>(
    `${environment.api_url}/donor/requests/${donationId}/collect-status?status=${status}`,
    {}
  );
}

  loadRequestList(donationId: string, status: string){
    this.AcceptRequest(donationId,status).subscribe((res)=>{

      this.requestListBevaragesSubject.next(res)
    }
    )
  }

}

//  /food-donation/api/v1/donor     /requests/{id}/accept