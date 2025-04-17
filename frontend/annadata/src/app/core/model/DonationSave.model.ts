import { SafeUrl } from "@angular/platform-browser";

export class DonationSave{
    title: string;
    description: string;
    foodCategory: 'PERISHABLE' | 'NON_PERISHABLE';
    foodType: 'VEG' | 'NON_VEG';
    quantity: number;
    expiryTime: Date;
    address: string;
    addressLink: SafeUrl;
    createdAt: Date;
    donorId:String;
    constructor(data?: Partial<DonationSave>){
      
        this.title = data?.title ?? '';
        this.description = data?.description ?? '';
        this.foodCategory = data?.foodCategory ?? 'PERISHABLE';
        this.foodType = data?.foodType ?? 'VEG';
        this.quantity = data?.quantity ?? 0;
        this.expiryTime = data?.expiryTime ? new Date(data.expiryTime) : new Date();
        this.address = data?.address ?? '';
        this.addressLink = data?.addressLink ?? '';
        this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
        this.donorId = data?.donorId ?? '';
    } 
}