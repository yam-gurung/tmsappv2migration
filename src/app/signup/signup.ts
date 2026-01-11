import {ChangeDetectorRef, Component} from '@angular/core';
import {SecurityUser} from '../listusers/listusers';
import {OnInit} from '@angular/core';
import {UserDataService} from '../service/data/user-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../interfaces/role.interface';
import { RoleDataService } from '../service/data/role-data.service';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
    selector:'app-signup',
    imports: [ReactiveFormsModule, FormsModule, A11yModule],
    templateUrl:'./signup.html',
    styleUrl:'./signup.css'
})
export class Signup implements OnInit{
    securityUser:SecurityUser=new SecurityUser("","","","","");
    constructor(private userDataService:UserDataService,
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
        this.userDataService.signup(this.securityUser)
        .subscribe((data)=>{
            this.route.navigate(['success'])
        });
    }
}