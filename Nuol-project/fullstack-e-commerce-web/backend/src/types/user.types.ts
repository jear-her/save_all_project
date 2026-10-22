export interface UserDTO{
    id:number;
    name:string;
    email:string;
    password?:string;
    role:string;
    createAt?:Date;
    updatedAt?:Date;
}