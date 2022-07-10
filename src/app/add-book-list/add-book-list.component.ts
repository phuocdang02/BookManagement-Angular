import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookDescription } from '../models/book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-add-book-list',
  templateUrl: './add-book-list.component.html',
  styleUrls: ['./add-book-list.component.css']
})
export class AddBookListComponent implements OnInit {
  private bookCollection: AngularFirestoreCollection<BookDescription>;
  books1: BookDescription[] = []
  marked= false;
  theCheckBox = 'hello';
  isChecked: any;

  constructor(
    private readonly angularFireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router,
  ) { this.bookCollection = angularFireStore.collection<BookDescription>('books1');}


  formAddBookList!: FormGroup
  ngOnInit(): void {
    this.formAddBookList = new FormGroup({
      bookname: new FormControl('',[Validators.required]),
      author: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      description: new FormControl(),
      category: new FormControl('',[Validators.required]),
      publisher: new FormControl('',[Validators.required]),
      status: new FormControl(),
    });
  }

  add(data:{
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
    console.log(inputData);

    //let docid ="id1";

    if (data.bookname === null || data.author === null
      || data.price === null || data.category === null || data.publisher === null
     ) {
      alert('Failed to adding new book! Please check again!!!!');
    }
    else {
      this.bookCollection.add(inputData); //adding  auto-generate "document id" 
      alert('Add Success !!!');
    this.router.navigate(["/admin"]);
    }
  }

  back(){
    this.router.navigate(['/admin']);
  }

  toggleVisibility(event:any){}

  click(event:any){}
  
  myFunction(event:any){
    console.log(event.target.defaultValue);
  }
}
