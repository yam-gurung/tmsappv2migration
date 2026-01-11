import {ChangeDetectorRef, Component,OnInit} from '@angular/core';
import {UserDataService} from '../service/data/user-data.service';
import { MatPaginator, PageEvent } from "@angular/material/paginator";

export class SecurityUser{
    constructor(
        public username:string,
        public password:string,
        public firstname:string,
        public lastname:string,
        public rolename:string){}
}

export class UserDTO{
    constructor(
        public username:string,
        public firstName:string,
        public lastName:string,
        public id:number,
        public roleName:string
    ){}
}

@Component({
    selector: 'app-listusers',
    imports: [MatPaginator],
    templateUrl:'./listusers.html',
    styleUrl:'./listusers.css'
})

export class ListUsers implements OnInit{
    totalElements: unknown;
    users:any[]=[];

    constructor(
        private userDataService:UserDataService,
        private cdr: ChangeDetectorRef
    ){}
    
    ngOnInit(){
        this.getUsers({page:"0",size:"5"});  
    }

    getUsers(request:any){
        this.userDataService.getAllUsers(request)
        .subscribe(
            (data)=>{
                this.users=data['content'];
                this.totalElements=data.page.totalElements;
                this.cdr.detectChanges();
            }
        );
    }

    nextPage(event: PageEvent) {
        this.getUsers({page:event.pageIndex,size:event.pageSize});
    }

}