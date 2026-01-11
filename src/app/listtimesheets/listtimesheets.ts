import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TimeSheetDataService } from '../service/data/timesheet-data.service';
import { Router,ActivatedRoute } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DatePipe,formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export class TimesheetDTO{
    constructor(
        public id:number,
        public project:string,
        public loginDate:string,
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
    imports: [MatPaginatorModule,DatePipe,FormsModule],
    templateUrl:'./listtimesheets.html',
    styleUrl:'./listtimesheets.css'
})
export class ListTimesheets implements OnInit{

    constructor(
        private cdr: ChangeDetectorRef,
        private timesheetService:TimeSheetDataService,
        private router:Router,
        private route:ActivatedRoute,
        private basicAuthenticationService:BasicAuthenticationService
    ){} 

    username!:string|null;
    message!:string;
    loading!:boolean;
    totalElements:number=0;
    private routeSub!:Subscription;

    timesheets!:TimesheetResponseDTO[];
    filteredTimesheets!:any;
    //startDate=formatDate(new Date(),'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
    //endDate=formatDate(new Date(),'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
    startDate!:string;
    endDate!:string;

    ngOnInit(){
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
        .subscribe({next:
            (data)=>{
                this.filteredTimesheets=this.timesheets=data['content'];
                this.totalElements=data.page.totalElements;
                this.cdr.markForCheck();
                this.loading=false;
            },error:(err)=>{
                this.loading=true;
            },
            complete:()=>{
                this.loading=true;
            }
    });
    }

    nextPage(event:PageEvent){
        if(this.startDate && this.endDate){
            this.startDate=formatDate(this.startDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.endDate=formatDate(this.endDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.getTimesheets({startDate:this.startDate,
                endDate:this.endDate,
                page:event.pageIndex,size:event.pageSize
            })
        }else{
        this.getTimesheets({page:event.pageIndex,size:event.pageSize});
        }
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

    ngOnDestryoy(){
        if(this.routeSub){
            this.routeSub.unsubscribe();
        }

    }

    searchResult() {
        console.log("search called"+this.startDate+" "+this.endDate);
        if(this.startDate && this.endDate){
            this.startDate=formatDate(this.startDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
        this.endDate=formatDate(this.endDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
        console.log("formated date "+this.startDate+" "+this.endDate);
        
            this.getTimesheets({startDate:this.startDate,
            endDate:this.endDate,page:"0",size:"10"});
    }else{
            this.getTimesheets({page:"0",size:"10"});
        }
        

        

    }

}