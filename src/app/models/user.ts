export interface User{
    userName?:string;
    email?:string;
    password?:string;
    status?:boolean; // If User offline ... the STATUS change into False
}
/* 
*Note: ?: Null Accepted
*/