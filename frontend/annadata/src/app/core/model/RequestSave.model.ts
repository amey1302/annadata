export class RequestSave{
    donationId:string;
    receiverId:string
    quantityRequested:number;
    message:string;

    constructor(){
        this.quantityRequested = 0;
        this.message = '';
        this.donationId = '';
        this.receiverId = '';
    }
}