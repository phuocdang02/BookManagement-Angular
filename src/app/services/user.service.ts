import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDescription } from '../models/book';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  bookCollection: AngularFirestoreCollection<BookDescription>;
  books: Observable<BookDescription[]>;

  constructor(
    public angularFireStore: AngularFirestore, 
    private angularFireAuth: AngularFireAuth
  ) { 
    this.bookCollection = this.angularFireStore.collection('books1')
    this.books = this.bookCollection.snapshotChanges().pipe(map((changes:any[])=>{
      return changes.map(a=>{
        const data = a.payload.doc.data() as BookDescription;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  //Method
  getBook():Observable<BookDescription[]>{
    return this.books;
  }

  deleteBook(book: BookDescription){
    this.bookCollection.doc(book.id).delete();
  }
  
  updateBook(book: BookDescription){
    this.bookCollection.doc(book.id).update(book);
  }

  getCurrentUser(){
    return new Promise<any>((resolve,reject)=>{
      var user = this.angularFireAuth.onAuthStateChanged(function(user){
        if(user){
          resolve(user);
        }
        else{
          reject('No user is logged in')
        }
      })
    })
  }
}
