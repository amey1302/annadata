import { Routes } from '@angular/router';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { DonationDetailsComponent } from './core/pages/donation-details/donation-details.component';
import { DonorHomeComponent } from './core/pages/donor-home/donor-home.component';
import { LoginSignupComponent } from './core/pages/login-signup/login-signup.component';
import { RequestList } from './core/pages/Request-List/requestList';
import { ReciverRequestList } from './core/pages/ReciverRequestList/Reciver-request.component'; 
export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomepageComponent
    },{
        path:'donation/:id',
        component:DonationDetailsComponent
    },{
        path:'donor/homepage',
        component:DonorHomeComponent
    },
    {
        path:'login',
        component:LoginSignupComponent
    },
    {
        path:'donation/:id/request',
        component:RequestList
    },
    {
        path:'my-requests',
        component : ReciverRequestList
    }
    //,{
    //     path:'signup'
    // },{
    //     path:'donor/request'
    // }
    // ,{
    //     path:'reciever/request'
    // }
    
];
