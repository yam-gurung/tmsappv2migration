import { Component, EventEmitter, Output} from '@angular/core'
import {BasicAuthenticationService} from '../service/basic-authentication.service';
import {OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector:'app-logout',
    imports:[],
    templateUrl:'./logout.html',
    styleUrl:'./logout.css'
})

export class Logout implements OnInit{
    constructor(private route:Router,private basicAuthenticationService:BasicAuthenticationService){}
   // @Output() loggedOut: new EventEmitter<void>();
    ngOnInit(){
        this.basicAuthenticationService.logout();
        
    }
}