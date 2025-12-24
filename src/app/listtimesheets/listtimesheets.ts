import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TimeSheetDataService } from '../service/data/timesheet-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

export class TimesheetDTO{
    constructor(
        public id:number,
        public project:string,
        public loginDate:Date,
        public loggedHr:number,
        public username?:string
    ){}
}

export class TimesheetResponseDTO{
    constructor(
        public id:number,
        public project:string,
        public loginDate:Date,
        public loggedHr:number
    ){}
}

@Component({
    selector:'app-listtimesheets',
    imports: [MatPaginatorModule,DatePipe],
    templateUrl:'./listtimesheets.html',
    styleUrl:'./listtimesheets.css'
})
export class ListTimesheets implements OnInit{
    constructor(
        private cdr: ChangeDetectorRef,
        private timesheetService:TimeSheetDataService,
        private router:Router,
        private basicAuthenticationService:BasicAuthenticationService
    ){} 

    username!:string|null;
    message!:string;
    loading!:boolean;
    totalElements!:number;

    timesheets!:TimesheetResponseDTO[];
    filteredTimesheets!:any;
    ngOnInit(){
        this.totalElements=0;
        //this.loading=false;
        this.username=this.basicAuthenticationService.getAuthenticatedUser();
        this.getTimesheets({page:"0",size:"10"});
    }

    filter(query:Date|any){
        this.filteredTimesheets=query?
        this.timesheets.filter((t)=>
            t.loginDate.toString()
        .includes(query.toString())
        ):this.timesheets;
    }

    private getTimesheets(request:any){
        this.loading=true;
        this.timesheetService.listTimesheets(this.username,request)
        .subscribe(
            (data)=>{
                this.filteredTimesheets=this.timesheets=data['content'];
                this.totalElements=data.page.totalElements;
               // console.log("total elements:"+this.totalElements)
                this.cdr.markForCheck();
                this.loading=false;
            }
        );
    }

    nextPage(event:PageEvent){
        this.getTimesheets({page:event.pageIndex,size:event.pageSize});
    }

    deleteTimesheet(id:number){
        this.timesheetService.deleteTimesheet(this.username,id)
        .subscribe((response)=>{
            this.message=`Delete of timesheet ${id} successfully!`;
            this.getTimesheets({page:"0",size:"10"})
        }
        );
    }

    updateTimesheet(id:number){
        this.router.navigate(['timesheets',id]);
    }

    addTimesheet(){
        this.router.navigate(['timesheets',-1]);
    }

}