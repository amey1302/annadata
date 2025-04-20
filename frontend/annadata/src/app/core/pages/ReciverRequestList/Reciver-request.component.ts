import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UserService } from '../../services/UserService';
@Component({
    selector: 'app-request-list',
    standalone: true,
    imports: [
         NavbarComponent,
                MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule,CommonModule,
            MatFormFieldModule,
            MatInputModule
    ], 
    templateUrl: './request-List.html',
    styleUrls: ['./requestList.css']
  })
export class ReciverRequestList implements OnInit {
   
    dataSource = new MatTableDataSource();
    constructor(private  requestService: RequestService,
        private userService: UserService, private router:Router
    ) {}
    displayedColumns: string[] = ['id', 'QtyRequest' , 'Message','Status','otp'];

    ngOnInit(): void {
        const userid : any = this.userService.getUser()
        if(userid===null){
          this.router.navigate(['/home']);
        }
        this.requestService.getRequestListReceiver(userid.id)
          .subscribe({
            next: (res) => {
            
              this.dataSource.data = res; 
            },
            error: (err) => {
              console.error('Error fetching request list:', err);
            }
          });
      }
}
