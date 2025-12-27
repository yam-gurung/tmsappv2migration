import {Component,ChangeDetectorRef, Inject, LOCALE_ID} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TimesheetDTO, TimesheetResponseDTO} from '../listtimesheets/listtimesheets';
import {OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TimeSheetDataService } from '../service/data/timesheet-data.service';
import {DatePipe, formatDate} from '@angular/common'
import { TimesheetRequest } from '../interfaces/timesheetrequest.interface';
@Component({
    selector:'app-timesheet',
    imports: [FormsModule,DatePipe],
    templateUrl:'./timesheet.html',
    styleUrl:'./timesheet.css'
})
export class Timesheet implements OnInit{
    timesheet!:TimesheetDTO;
    timesheetR!:TimesheetResponseDTO
    id!:number;
    username!:string|null;;
    dateString:string|null=null;
    options:string[]=
    ['tms','tms development','tms support','tms testing'];
    formattedDateForInput!: string;

    constructor(
        private timesheetService:TimeSheetDataService,
        private router:Router,
        private cdr: ChangeDetectorRef,
        @Inject(LOCALE_ID) private locale:string,
        private route:ActivatedRoute,
        private basicAuthenticationService:BasicAuthenticationService
    ){}

    ngOnInit(){
        this.id=this.route.snapshot.params['id']
        
    /* potentially a date from an API or new Date() */
    // Use formatDate to ensure the format is strictly 'yyyy-MM-dd' iso format
    // 'en-US' locale is used as an example, you might adjust it based on your app's locale

        this.timesheet=new TimesheetDTO(this.id,'',formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ', 'en-US'),0,"");
        this.username=this.basicAuthenticationService.getAuthenticatedUser();
        if(this.id!=-1){
            this.timesheetService.retrieveTimesheet(this.username,this.id)
            .subscribe((data)=>{
                this.timesheet.id=data.id;
                this.timesheet.project=data.project;
                this.timesheet.loggedHr=data.loggedHr;
                this.timesheet.username=data.username;
                //this.timesheet.loginDate=new Date(data.loginDate).toISOString();
                console.log("login date from server: "+data.loginDate);
                this.timesheet.loginDate = formatDate(new Date(data.loginDate), 'yyyy-MM-dd',this.locale);
                console.log("retrieved timesheet: "+this.timesheet.project+" "+
                    this.timesheet.loggedHr+" "+this.timesheet.loginDate);
                    this.cdr.markForCheck();
            });
        }
    }

    saveTimesheet(){
        if(this.id==-1){
            //const dateObject=new Date(this.timesheet.loginDate)
            //const isoDateString=dateObject.toISOString();

            //const isoStringLocal = dateObject.toISOString().slice(0, 10);
            //console.log(isoStringLocal);
        
            
            this.timesheetService.createTimesheet(this.username,this.timesheet)
            .subscribe(()=>{
                this.router.navigate(['timesheets'])
            });
        }else{
            const timesheetReq:TimesheetRequest={id:this.id,project:this.timesheet.project,
                loginDate:new Date(this.timesheet.loginDate)
                ,loggedHr:this.timesheet.loggedHr,
                username:this.timesheet.username
            };
            this.timesheetService.updateTimesheet(this.username,this.id,this.timesheet)
            .subscribe( 
                (data)=>{
                    this.router.navigate(['timesheets']);
                }
            );
        }
    }
}