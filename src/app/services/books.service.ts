import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookDescription } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getBooks():Observable<Book[]>{
    return this.httpClient.get<Book[]>('http://localhost:8000/api/items/');
  }
  insertBook(book:BookDescription):Observable<BookDescription>{
    return this.httpClient.post<BookDescription>('http://localhost:8000/api/insert/',book);
  }
}
