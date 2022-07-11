import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private fb!: FormBuilder ;
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  
  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
  ) { 
    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.password=new FormControl('',[Validators.required,Validators.minLength(8)]);
    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
    })
    this.registerForm= builder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.authService.signUp(this.email.value, this.password.value).then(res =>{
      console.log(res)
      this.router.navigateByUrl("/admin")
    });
    this.router.navigateByUrl("/admin")
  }
}
