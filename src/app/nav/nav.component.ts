import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharingService } from '../services/sharing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  displayName?:string;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private sharingService:SharingService,
    private angularFireAuth:AngularFireAuth,
    private router:Router,
  ) { 
    this.sharingService.isUserLoggedIn.subscribe(value=>{
      if(value){
        this.userService.getCurrentUser().then(user=>{
          this.displayName=user.displayName != null ? user.displayName:user.email
          console.log(this.displayName);
        }).catch(e=>{console.log(e)});
      }
    })
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user=>this.displayName = user.displayName !=null ? user.displayName:user.email);
    console.log(this.displayName);
  }

  logOut(){
    this.authService.logOut();
    location.href="/";
  }

  bookList(){
    this.router.navigate(["/admin"]);
  }
}
