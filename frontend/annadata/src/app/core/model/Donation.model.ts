export class Donation {
    id: string;
    title: string;
    description: string;
    foodCategory: 'PERISHABLE' | 'NON_PERISHABLE';
    foodType: 'VEG' | 'NON_VEG';
    quantity: number;
    expiryTime: Date;
    address: string;
    addressLink: string;
    createdAt: Date;
    status: 'OPEN' | 'CLOSED' | 'PENDING';
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    donorId:String;
    constructor(data?: Partial<Donation>){
        this.id = data?.id ?? '';
        this.title = data?.title ?? '';
        this.description = data?.description ?? '';
        this.foodCategory = data?.foodCategory ?? 'PERISHABLE';
        this.foodType = data?.foodType ?? 'VEG';
        this.quantity = data?.quantity ?? 0;
        this.expiryTime = data?.expiryTime ? new Date(data.expiryTime) : new Date();
        this.address = data?.address ?? '';
        this.addressLink = data?.addressLink ?? '';
        this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
        this.status = data?.status ?? 'OPEN';
        this.donorName = data?.donorName ?? '';
        this.donorEmail = data?.donorEmail ?? '';
        this.donorPhone = data?.donorPhone ?? '';
        this.donorId = data?.donorId ?? '';
    }
}