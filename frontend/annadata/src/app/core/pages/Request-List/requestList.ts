import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import {RequestService} from '../../services/request.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
// import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {AcceptRequestService} from '../../services/AcceptRequest.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
    selector: 'app-request-list',
    standalone: true,
    imports: [
        NavbarComponent,
        MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule,CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,MatSelectModule
    ], 
    templateUrl: './request-List-comp.html',
    styleUrls: ['./requestListCss.css']
  })
export class RequestList implements OnInit {
    donationId!: string;
    requestList: any = [];

    isHistoryView: boolean = false; 
    
    acceptedDataSource = new MatTableDataSource();
    historyDataSource = new MatTableDataSource();
    acceptedColumns : string[] = ['id','reciverName','reciverContact', 'QtyRequest' , 'Message','otp','Status'];


    constructor(private route: ActivatedRoute , private requestService: RequestService,
       private acceptrequestService : AcceptRequestService 
    ) {

      
    }
    dataSource = new MatTableDataSource();
    
    displayedColumns: string[] = ['id','receiverName','reciverContact', 'QtyRequest' , 'Message','Status'];
    displayedColumns2: string[] = ['id','receiverName','reciverContact', 'QtyRequest' , 'Message','Status'];

    // ngOnInit(): void {

    //     this.donationId = this.route.snapshot.paramMap.get('id') || '';
    //     console.log(this.donationId);
    //     this.requestService.getRequestList(this.donationId).subscribe({
    //         next: (res) => {
    //           this.requestList = res;
    //         //   console.log('Fetched Requests:', this.requestList);
    //         console.log(this.requestList);
    //         this.dataSource.data = this.requestList.filter((request: any) => request.status === 'PENDING' && request.
    //         collectStatus === 'NOT_COLLECTED');
    //         this.acceptedDataSource.data = this.requestList.filter((request: any) => request.status === 'ACCEPTED' && request.
    //         collectStatus === 'NOT_COLLECTED');
            
    //     }
    //     ,
    //         error: (err) => {
    //           console.error('Error fetching requests:', err);
    //         }
    //       });
    //     }

    ngOnInit(): void {
        this.donationId = this.route.snapshot.paramMap.get('id') || '';
        this.requestService.loadRequestList(this.donationId);

       
        this.requestService.requestList$.subscribe({
            next: (res) => {
              this.requestList = res;

            this.dataSource.data = this.requestList.filter((request: any) => request.status === 'PENDING' && request.
              collectStatus === 'NOT_COLLECTED');
            

            this.acceptedDataSource.data = this.requestList.filter(
              (request: any) =>
                request.status === 'ACCEPTED' && request.collectStatus === 'NOT_COLLECTED'
            );

            this.historyDataSource.data = this.requestList.filter(
              (request: any) =>
                request.status === 'REJECTED' || request.collectStatus === 'COLLECTED'
            );
            }
        })
          
    }
 

        acceptRequest(status: string,requestId: string) {
            console.log(requestId);
            
            this.acceptrequestService.AcceptRequest(requestId,status).subscribe({
              next: (res) => {
                console.log('Request accepted successfully:', res);
                this.requestService.loadRequestList(this.donationId);

              },
              error: (err) => {
                console.error('Error accepting request:', err);
              }
            })
          }

          completeRequest(requestId: string) {
            console.log(requestId);
            this.acceptrequestService.CollectionRequest(requestId).subscribe({
              next: (res) => {
                console.log('Request Collection successfully:', res);
                this.requestService.loadRequestList(this.donationId);

              },
              error: (err) => {
                console.error('Error Collection request:', err);
              }
            })
          }

    
}