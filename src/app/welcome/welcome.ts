import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../service/basic-authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit {
  name!:string;

  constructor(
   private route:ActivatedRoute,
    private basicAuthenticationService:BasicAuthenticationService){}

  ngOnInit(){
    //this.name=this.basicAuthenticationService.getAuthenticatedUser();
    this.name =this.route.snapshot.params["name"];
  }
}
