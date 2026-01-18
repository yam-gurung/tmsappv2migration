import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { TimeSheetDataService } from '../service/data/timesheet-data.service';
import { Router,ActivatedRoute } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { MatPaginatorModule, PageEvent,MatPaginator } from '@angular/material/paginator';
import { DatePipe,formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

export class TimesheetDTO{
    constructor(
        public id:number,
        public project:string,
        public loginDate:string,
        public fromTime:string,
        public toTime:string,
        public loggedHr:number,
        public username?:string
    ){}
}

export class TimesheetResponseDTO{
    constructor(
        public id:number,
        public project:string,
        public loginDate:Date,
        public fromTime:string,
        public toTime:string,
        public loggedHr:number,
        public username?:string
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
    startDate!:string;
    endDate!:string;
    project!: string;
    searchStartDate!:string;
    searchEndDate!:string;
    searchProject!:string;

    ngOnInit(){
        this.username=this.basicAuthenticationService.getAuthenticatedUser();
        this.getTimesheets({page:"0",size:"10"});
    }

    @ViewChild(MatPaginator) paginator!:MatPaginator;

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
        
        if(this.searchStartDate && this.searchEndDate && this.searchProject){
             this.searchStartDate=formatDate(this.searchStartDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.searchEndDate=formatDate(this.searchEndDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.getTimesheets({startDate:this.searchStartDate,endDate:this.searchEndDate,project:this.searchProject,page:event.pageIndex,size:event.pageSize});
        }else if(this.searchStartDate && this.searchEndDate){
            this.searchStartDate=formatDate(this.searchStartDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.searchEndDate=formatDate(this.searchEndDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.getTimesheets({startDate:this.searchStartDate,
                endDate:this.searchEndDate,
                page:event.pageIndex,size:event.pageSize
            })
        }else if(this.searchProject){
            this.getTimesheets({project:this.searchProject,page:event.pageIndex,size:event.pageSize});
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
    
        this.searchStartDate=this.startDate;
        this.searchEndDate=this.endDate;
        this.searchProject=this.project;
       
        if(this.paginator){
            this.paginator.firstPage();
        }
        
        console.log("search called"+this.startDate+" "+this.endDate);

        if(this.searchStartDate && this.searchEndDate){
            this.searchStartDate=formatDate(this.searchStartDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.searchEndDate=formatDate(this.searchEndDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
      
        }
        
        if(this.searchStartDate && this.searchEndDate && this.searchProject){
     
        console.log("formated date "+this.searchStartDate+" "+this.searchEndDate+" project "+this.searchProject);
        
        this.getTimesheets({startDate:this.searchStartDate,endDate:this.searchEndDate,
            project:this.searchProject,page:"0",size:"10"});

        }
        else if(this.searchStartDate && this.searchEndDate){ 
            this.getTimesheets({startDate:this.searchStartDate,
            endDate:this.searchEndDate,page:"0",size:"10"});

    }else if(this.searchProject){
        
        console.log("project "+this.project);
        this.getTimesheets({project:this.searchProject,page:"0",size:"10"});

    }else{
            this.getTimesheets({page:"0",size:"10"});
        }
    }

}