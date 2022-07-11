//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Firebase
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
/* import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore'; */

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './book-list/book-list.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { AddBookListComponent } from './add-book-list/add-book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookListComponent,
    RegisterComponent,
    NavComponent,
    AddBookListComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule
    /* provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()) */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
