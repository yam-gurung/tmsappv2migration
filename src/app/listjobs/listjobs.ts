import {Component,OnInit} from '@angular/core';
import { JobDataService } from '../service/data/job-data.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import {Router} from '@angular/router';

@Component({
    selector:'app-listjobs',
    imports:[],
    templateUrl:'./listjobs.html',
    styleUrl:'./listjobs.css'
})
export class ListJobs implements OnInit{

    username!:string|null;
    jobList!:string[];

    constructor(private jobDataService: JobDataService,
        private basicAuthService:BasicAuthenticationService,
        private route:Router
    ){}

    ngOnInit(){
        this.jobList=['Timesheets','Roles Data Load'];
        this.username=this.basicAuthService.getAuthenticatedUser(); 
    }

    executeTimesheetJob(){
        this.jobDataService.executeDailyTimesheetReportJob(this.username).subscribe({
            next:
            (response)=>{
                console.log(response);
                this.route.navigate(['jobsuccess']);
            },
            error:(error)=>{
                console.log(error);
            },complete:()=>{}
    });
    }

    executeRolesDataLoadJob() {
        
    }

}