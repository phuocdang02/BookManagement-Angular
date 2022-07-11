import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Book, BookDescription } from '../models/book';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private bookCollection:AngularFirestoreCollection<BookDescription>;

  config: any;
  books1: BookDescription[]=[];
  searchName!:string;
  formSearch!:FormGroup;
  Search!:FormControl;
  editState:boolean=false;
  booksToEdit!:BookDescription;
  marked=false;

  constructor(
    private readonly angularFireStore:AngularFirestore,
    private userService:UserService,
    private router:Router,
  ) { this.bookCollection = angularFireStore.collection<BookDescription>('books1');}
  pageChanged(event:number){
    this.config.currentPage = event;
  }

  formUpdate!:FormGroup;
  ngOnInit(): void {
    this.userService.getBook().subscribe((books1: BookDescription[])=>{
      this.books1 = books1
      this.formUpdate = new FormGroup({
        id: new FormControl(),
        bookname: new FormControl(),
        author: new FormControl(),
        price: new FormControl(),
        description: new FormControl(),
        category: new FormControl(),
        publisher: new FormControl(),
        status: new FormControl(),
      })
    })
    this.formSearch = new FormGroup({
      Search: new FormControl(),
    })
  }

  inputNull(){
    if(this.searchName == ''){
      this.ngOnInit();
    }
  }

  search(){
    console.log(this.searchName);
    if(this.searchName==''){
      this.ngOnInit();
    }
    else{
      this.books1 = this.books1.filter(res=>{
        return res.bookname?.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
        /* 
          *Compare data in array with input data
        */
      })
    }
  }

  update(data:{
    id: string;
    bookname: string;
    author: string;
    price: string;
    description: string;
    category: string;
    publisher: string;
    status: string;
  }){
    let inputData: BookDescription={};
    inputData.bookname = data.bookname
    inputData.author = data.author
    inputData.price = data.price
    inputData.description = data.description
    inputData.category = data.category
    inputData.publisher = data.publisher
    inputData.status = data.status

    const id=this.angularFireStore.createId();

    this.bookCollection.doc(id).update(inputData);
    this.clearState();
  }

  delete(books1:BookDescription){
    this.userService.deleteBook(books1);
    alert('Deleted');
  }

  edit(book: BookDescription){
    this.editState = true;
    this.booksToEdit = book;
  }

  /* edit(){
    this.router.navigate(["/admin/update-book-list"])
  } */

  add(){
    this.router.navigate(["/admin/add-book-list"]);
  }

  back(){
    this.clearState();
    this.router.navigate(["/admin"]);
  }

  clearState() {
    this.editState = false;
  }
}
