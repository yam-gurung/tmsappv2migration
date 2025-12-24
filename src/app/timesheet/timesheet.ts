import {Component,ChangeDetectorRef, Inject, LOCALE_ID} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TimesheetDTO, TimesheetResponseDTO} from '../listtimesheets/listtimesheets';
import {OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TimeSheetDataService } from '../service/data/timesheet-data.service';
import {formatDate} from '@angular/common'

@Component({
    selector:'app-timesheet',
    imports: [FormsModule],
    templateUrl:'./timesheet.html',
    styleUrl:'./timesheet.css'
})
export class Timesheet implements OnInit{
    timesheet!:TimesheetDTO;
    timesheetR!:TimesheetResponseDTO
    id!:number;
    username!:string|null;;
    dateString:string|null=null;

    constructor(
        private timesheetService:TimeSheetDataService,
        private router:Router,
        private cdr: ChangeDetectorRef,
        @Inject(LOCALE_ID) private locale:string,
        private route:ActivatedRoute,
        private basicAuthenticationService:BasicAuthenticationService
    ){}

    ngOnInit(){
        this.id=this.route.snapshot.params['id'];
           this.dateString = formatDate(new Date(), 'yyyy-MM-dd',this.locale);
  

        this.timesheet=new TimesheetDTO(this.id,'',this.dateString,0,"");
        this.username=this.basicAuthenticationService.getAuthenticatedUser();
        if(this.id!=-1){
            this.timesheetService.retrieveTimesheet(this.username,this.id)
            .subscribe((data)=>{
                this.timesheet=data;
                 this.timesheet.loginDate = formatDate(new Date(this.timesheet.loginDate), 'yyyy-MM-dd',this.locale,'UTC');
                console.log("retrieved timesheet: "+this.timesheet.project+" "+
                    this.timesheet.loggedHr+" "+this.timesheet.loginDate);
                    this.cdr.markForCheck();
            });
        }
    }

    saveTimesheet(){
        if(this.id==-1){
            console.log(this.timesheet);
            this.timesheetService.createTimesheet(this.username,this.timesheet)
            .subscribe(()=>{
                this.router.navigate(['timesheets'])
            });
        }else{
            this.timesheetService.updateTimesheet(this.username,this.id,this.timesheet)
            .subscribe(
                (data)=>{
                    this.router.navigate(['timesheets']);
                }
            );
        }
    }
}