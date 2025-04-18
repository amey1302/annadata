export class User{
    id?:string;
    name:string;
    email:string;
    password:string;
    phoneNumber:string;
    role:string;

    constructor(){
        this.id = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.phoneNumber = '';
        this.role = '';
    }
}