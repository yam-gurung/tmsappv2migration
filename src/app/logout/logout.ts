import { ChangeDetectorRef, Component,OnInit} from '@angular/core'
import {AUTHENTICATED_USER, BasicAuthenticationService, TOKEN} from '../service/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
    selector:'app-logout',
    imports:[],
    templateUrl:'./logout.html',
    styleUrl:'./logout.css'
})

export class Logout implements OnInit{
    constructor(private basicAuthenticationService:BasicAuthenticationService){}
   // @Output() loggedOut: new EventEmitter<void>();
    ngOnInit(){
        //this.basicAuthenticationService.logout();
        }
}