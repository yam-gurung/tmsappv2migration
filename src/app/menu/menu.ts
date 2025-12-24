import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {BasicAuthenticationService} from '../service/basic-authentication.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterOutlet,NgbDropdownModule,AsyncPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  //isUserLoggedIn:boolean=false;
  isLoggedIn$:Observable<boolean>;
  authenticatedUser:string|null="";
  constructor(private basicAuthenticationService:BasicAuthenticationService){
    //this.isUserLoggedIn = this.basicAuthenticationService.isUserLoggedIn();
    this.isLoggedIn$=this.basicAuthenticationService.isLoggedIn$
    this.authenticatedUser = this.basicAuthenticationService.getAuthenticatedUser();
  }
  ngOnInit(){
    }
    
}
