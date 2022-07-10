import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookListComponent } from './add-book-list/add-book-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { UpdateBookListComponent } from './update-book-list/update-book-list.component';

const routes: Routes = [
  {
    path:'admin',
    component:MainComponent,
    canActivate:[AuthGuard],
    children:[
      {path:"",component:BookListComponent},
      {path:"add-book-list",component:AddBookListComponent},
      {path:"update-book-list", component:UpdateBookListComponent}
    ]
  },
  {path:'register', component:RegisterComponent},
  {path:'**',component:LoginComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
