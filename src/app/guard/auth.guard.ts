import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService:UserService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,reject)=>{
      this.userService.getCurrentUser() //checking User is logged in yet ? if logged is TRUE, oposite is FALSE
      .then(user=>{
        resolve(true)
      },
      err=>{
        resolve(false);
        this.router.navigate(["/login"]); //Navigate to Login page if not Login already
      })
    });
  }
}
