export class RequestSave{
    donationId:any;
    receiverId:any
    quantityRequested:number;
    message:string;

    constructor(){
        this.quantityRequested = 0;
        this.message = '';
        this.donationId = '';
        this.receiverId = '';
    }
}