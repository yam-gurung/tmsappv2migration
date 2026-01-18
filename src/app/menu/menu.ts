import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive,Router, RouterOutlet } from "@angular/router";
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
  isLoggedIn$:Observable<boolean>;
  userRole:string|null="";
  
  constructor(private route:Router, public basicAuthenticationService:BasicAuthenticationService){
    console.log("menu called on statup constructor")
    this.isLoggedIn$=this.basicAuthenticationService.isLoggedIn$;
    console.log("logged in value "+this.isLoggedIn$)    
    //this.userRole=this.basicAuthenticationService.getUseRole();
    //console.log("user role",this.userRole);
  }
  ngOnInit(){
        console.log("menu called on statup method ngOnInit()")

    }

    logout(){
      this.basicAuthenticationService.logout();
      this.route.navigate(['/logout']);
    }
    
}
