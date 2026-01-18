import {Component, OnInit, ChangeDetectorRef,ViewChild} from '@angular/core';
import { TimesheetAdminDataService } from '../service/data/timesheet-admindata.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TimesheetResponseDTO } from '../listtimesheets/listtimesheets';
import {DatePipe,formatDate} from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'app-listallemployeestimesheets',
    imports:[DatePipe,MatPaginator,FormsModule],
    templateUrl:'./listallemployeestimesheets.html',
    styleUrl:'./listallemployeestimesheets.css'
})
export class ListAllEmployeesTimesheets implements OnInit {

    loading!:boolean;
    username!:string|null;
    startDate!:string;
    endDate!:string;
    searchStartDate!:string;
    searchEndDate!:string;
    userName!:string|null;
    searchUserName!:string|null;
    project!:string|null;
    searchProject!:string|null;
    totalElements:number=0;
    timesheets!:TimesheetResponseDTO[];
    filteredTimesheets!:any;

    @ViewChild(MatPaginator) paginator!:MatPaginator;

    constructor(private timesheetAdminDataService: TimesheetAdminDataService,
        private basicAuthenticationService:BasicAuthenticationService,
        private cdr:ChangeDetectorRef
    ){}
    
    ngOnInit(){
        this.username=this.basicAuthenticationService.getAuthenticatedUser();
        this.getTimesheets({page:"0",size:"10"});
    }

    getTimesheets(request:any){
        this.loading=true;
        this.timesheetAdminDataService.listAllEmployeesTimesheets(this.username,request).subscribe(
            {next:(response) => {
                console.log(response);
                this.filteredTimesheets=this.timesheets=response['content'];
                this.totalElements=response.page.totalElements;
                this.cdr.markForCheck();
                this.loading=false;
            },
            error:(error)=>{
                console.log("Error retrieving all employees timesheets",error);
                this.loading=true;
            },
            complete:()=>{
                console.log("completed retrieving all employees timesheets");
                this.loading=true;
            }
    });
    }

    nextPage(event: PageEvent) {
       
        if(this.searchStartDate && this.searchEndDate && this.searchUserName && this.searchProject){
            this.searchStartDate=formatDate(this.searchStartDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.searchEndDate=formatDate(this.searchEndDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.getTimesheets({username:this.searchUserName,startDate:this.searchStartDate,endDate:this.searchEndDate,project:this.searchProject,page:event.pageIndex,size:event.pageSize});
        }else if(this.searchStartDate && this.searchEndDate && this.searchUserName){
            this.getTimesheets({username:this.searchUserName,startDate:this.searchStartDate,endDate:this.searchEndDate,page:event.pageIndex,size:event.pageSize});
        }else if(this.searchStartDate && this.searchEndDate && this.searchProject){
            this.getTimesheets({startDate:this.searchStartDate,endDate:this.searchEndDate,project:this.searchProject,page:event.pageIndex,size:event.pageSize});
        }
        else if(this.searchStartDate && this.searchEndDate){
            this.searchStartDate=formatDate(this.searchStartDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.searchEndDate=formatDate(this.searchEndDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.getTimesheets({startDate:this.searchStartDate,
                endDate:this.searchEndDate,
                page:event.pageIndex,size:event.pageSize
            })
        }else if(this.searchUserName && this.searchProject){
            this.getTimesheets({username:this.searchUserName,project:this.searchProject,page:event.pageIndex,size:event.pageSize});
        }else if(this.searchUserName){
            this.getTimesheets({username:this.searchUserName,page:event.pageIndex,size:event.pageSize});
        }else if(this.searchProject){
            this.getTimesheets({project:this.searchProject,page:event.pageIndex,size:event.pageSize});
        }else{
        this.getTimesheets({page:event.pageIndex,size:event.pageSize});
        }
    }

    searchResult() {

        this.searchUserName = this.userName;
        this.searchStartDate=this.startDate;
        this.searchEndDate=this.endDate;
        this.searchProject=this.project;

        if(this.paginator){
            this.paginator.firstPage();
        }

        console.log("start date: "+this.startDate+" end Date: "+this.endDate);

        if(this.searchStartDate && this.searchEndDate){
            this.searchStartDate=formatDate(this.searchStartDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            this.searchEndDate=formatDate(this.searchEndDate,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US');
            console.log("formatted start date: "+this.searchStartDate+" formatted end Date: "+this.searchEndDate);
        }

        if(this.searchStartDate && this.searchEndDate && this.searchUserName && this.searchProject){
            this.getTimesheets({username:this.searchUserName,startDate:this.searchStartDate,endDate:this.searchEndDate,project:this.searchProject,page:"0",size:"10"});
        }else if(this.searchStartDate && this.searchEndDate && this.searchUserName){
            this.getTimesheets({username:this.searchUserName,startDate:this.searchStartDate,endDate:this.searchEndDate,page:"0",size:"10"});
        }else if(this.searchStartDate && this.searchEndDate && this.searchProject){
            this.getTimesheets({startDate:this.searchStartDate,endDate:this.searchEndDate,project:this.searchProject,page:"0",size:"10"});
        }
        else if(this.searchStartDate && this.searchEndDate){
            this.getTimesheets({startDate:this.searchStartDate,endDate:this.searchEndDate,page:"0",size:"10"});
        }else if(this.searchUserName && this.searchProject){
            this.getTimesheets({username:this.searchUserName,project:this.searchProject,page:"0",size:"10"});
        }
        else if(this.searchUserName){
            this.getTimesheets({username:this.searchUserName,page:"0",size:"10"});
        }else if(this.searchProject){
            this.getTimesheets({project:this.searchProject,page:"0",size:"10"});
        }
        else{
            this.getTimesheets({page:"0",size:"10"});
        }
    }

}