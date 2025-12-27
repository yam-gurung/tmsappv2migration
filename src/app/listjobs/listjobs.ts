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

    constructor(private jobDataService: JobDataService,
        private basicAuthService:BasicAuthenticationService,
        private route:Router
    ){}

    ngOnInit(){
        this.username=this.basicAuthService.getAuthenticatedUser(); 
    }

    executeJob(){
        this.jobDataService.executeDailyTimesheetReportJob(this.username).subscribe(
            (response)=>{
                console.log(response);
                this.route.navigate(['jobsuccess']);
            },
            (error)=>{
                console.log(error);
            }
        );
    }
}