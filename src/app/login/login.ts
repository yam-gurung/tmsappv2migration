import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {BasicAuthenticationService} from '../service/basic-authentication.service'

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username!:string|null;
  password!:string;
  errorMessage!:string;
  invalidLogin!:boolean;

  constructor(private router:Router,
    private basicAuthenticationService:BasicAuthenticationService
    ,private cdr:ChangeDetectorRef
  ){}

  ngOnInit(){
    this.errorMessage="Invalid Credentials"
    this.invalidLogin=false;
   }

  handleJWTAuthLogin(){
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username,this.password)
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.router.navigate(["welcome",this.username]);
        this.invalidLogin=false;
      },
      error:(error)=>{
        console.log("error log "+error);
        this.invalidLogin=true;
        this.cdr.markForCheck();;
      },
      complete:()=>{
        console.log("JWT Authentication Complete");
      }
  });
  }
}
