import {Component,OnInit} from '@angular/core';

export class SecurityUser{
    constructor(
        public username:string,
        public password:string,
        public firstname:string,
        public lastname:string,
        public rolename:string){}
}

@Component({
    selector: 'app-listusers',
    imports:[],
    templateUrl:'./listusers.html',
    styleUrl:'./listusers.css'
})
export class ListUsers implements OnInit{
    constructor(){}

    ngOnInit(){}
}