import {Component} from '@angular/core';
import {SecurityUser} from '../listusers/listusers';
import {OnInit} from '@angular/core';
import {SignupService} from '../service/data/signup.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector:'app-signup',
    imports:[FormsModule],
    templateUrl:'./signup.html',
    styleUrl:'./signup.css'
})
export class Signup implements OnInit{
    securityUser:SecurityUser=new SecurityUser("","","","","");
    constructor(private signupService:SignupService,
        private route:Router
    ){}
    ngOnInit(){
    }

    signup(){
        this.signupService.signup(this.securityUser)
        .subscribe((data)=>{
            console.log(data);
            this.route.navigate(['success'])
        });
    }
}