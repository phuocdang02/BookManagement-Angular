export class Book{
    id:string="";
    bookname:string="";
    author:string="";
    price:string="";
    description:string="";
    category:string="";
    publisher:string="";
    status:string="";
}

export interface BookDescription {
    id?:string;
    bookname?:string;
    author?:string;
    price?:string;
    description?:string;
    category?:string;
    publisher?:string;
    status?:string;
}