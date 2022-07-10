import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  email:FormControl;
  password:FormControl;

  constructor(
    public authService: AuthService,
    private router: Router,
    builder: FormBuilder
  ) { 
    this.email = new FormControl('',[Validators.required]);
    this.password = new FormControl('',[Validators.required]);
    this.signInForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    })
    this.signInForm = builder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
  }

  loginByGoogle(){
    this.authService.signInGoogle().then(res=>{
      this.router.navigate(["/admin"]);
    }).catch(err => {
      alert('Failed Google Login');
    })
  }

  loginByEmail(){
    this.authService.signInEmail(this.email.value, this.password.value).then(res => {
      this.router.navigate(["/admin"]);
    }).catch(err => {
      alert('Failed!!!, Please check your email or password');
    })
  }

  register(){
    this.router.navigate(["/register"]);
  }
}
