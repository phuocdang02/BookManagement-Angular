import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookDescription } from '../models/book';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-book-list',
  templateUrl: './update-book-list.component.html',
  styleUrls: ['./update-book-list.component.css']
})
export class UpdateBookListComponent implements OnInit {
  private bookCollection:AngularFirestoreCollection<BookDescription>;
  config: any;
  books1: BookDescription[]=[]
  editState:boolean=false;
  booksToEdit!:BookDescription;
  marked=false;
  
  constructor(
    private readonly angularFireStore:AngularFirestore,
    private userService:UserService,
    private router: Router,
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

  clearState() {
    this.editState = false;
  }

  back(){
    this.clearState();
    this.router.navigate(["/admin"]);
  }
}
