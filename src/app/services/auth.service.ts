import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { SharingService } from './sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    /* private fireAuth:AngularFireAuth, */
    private angularfireAuth:AngularFireAuth,
    private router: Router,
    private dataSharingService: SharingService
  ) { }

  signUp(email: string, password: string){
    return new Promise<any>((resolve, reject)=>{
      this.angularfireAuth.createUserWithEmailAndPassword(email,password).then(res =>{
        resolve(res);
      },
       err => reject(err))
    })
  }
  async signInGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    return await this.angularfireAuth.signInWithPopup(provider).then(res=>{
      console.log("Login with Gmail success !!!");
      this.dataSharingService.isUserLoggedIn.next(true);
    })
  }

  async signInEmail(email: string, password: string){
    return await new Promise<any>((resolve,reject)=>{
      this.angularfireAuth.signInWithEmailAndPassword(email,password).then(res=>{
        resolve(res);
      },
      err => reject(err))
    })
  }

  logOut(){
    return new Promise<any>(async(resolve,reject)=>{
      if(await this.angularfireAuth.currentUser){
        this.angularfireAuth.signOut();
        resolve("Log out");
      }
      else{
        reject();
      }
    })
  }

  getCurrentUser(){
    return new Promise<any>((resolve,reject)=>{
      var user = this.angularfireAuth.onAuthStateChanged(function(user){
        if(user){
          resolve(user);
        }
        else{
          reject('There no user logged in')
        }
      })
    })
  }
}
