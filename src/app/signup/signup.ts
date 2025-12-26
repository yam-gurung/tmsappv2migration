import {ChangeDetectorRef, Component} from '@angular/core';
import {SecurityUser} from '../listusers/listusers';
import {OnInit} from '@angular/core';
import {SignupService} from '../service/data/signup.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../interfaces/role.interface';
import { RoleDataService } from '../service/data/role-data.service';

@Component({
    selector:'app-signup',
    imports:[ReactiveFormsModule,FormsModule],
    templateUrl:'./signup.html',
    styleUrl:'./signup.css'
})
export class Signup implements OnInit{
    securityUser:SecurityUser=new SecurityUser("","","","","");
    constructor(private signupService:SignupService,
        private route:Router,
        private roleService:RoleDataService,
        private cdr: ChangeDetectorRef
    ){}
    ngOnInit(){
        this.roleService.retrieveAllRoles().subscribe(
            (data)=>{
                this.roles=data;
                this.cdr.markForCheck();
            }
        );
    }

    roles:Role[]=[];

    signup(){
        this.signupService.signup(this.securityUser)
        .subscribe((data)=>{
            this.route.navigate(['success'])
        });
    }
}