import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TimesheetDTO, TimesheetResponseDTO} from '../listtimesheets/listtimesheets';
import {OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TimeSheetDataService } from '../service/data/timesheet-data.service';
import { DatePipe,formatDate } from '@angular/common';

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
    //loginDate=new FormControl(new Date());
    constructor(
        private timesheetService:TimeSheetDataService,
        private router:Router,
        private route:ActivatedRoute,
        private basicAuthenticationService:BasicAuthenticationService
    ){
        this.formatDateForInput();
    }

    myDate: Date = new Date();
  
  // A variable to hold the formatted string for the form input
  formattedDateForInput: string = '';

  

  formatDateForInput(): void {
    // Format the date using the formatDate function:
    // 'yyyy-MM-dd' is the standard format required by HTML5 date inputs
    // 'en-US' is the locale, and 'UTC' is the timezone (adjust as needed)
    this.formattedDateForInput = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US', 'UTC');
    
    console.log(`Original Date: ${this.myDate}`);
    console.log(`Formatted Date for Input: ${this.formattedDateForInput}`);
  }

    ngOnInit(){
        this.id=this.route.snapshot.params['id'];
        //let apiDate = new Date(); // Example date from API response
        //let formattedDate = this.datePipe.transform(apiDate, 'yyyy-MM-dd');
        //console.log("non formatted date: "+apiDate);
        //new Date(formattedDate);
        this.timesheet=new TimesheetDTO(this.id,'',new Date(),0,"");
        //this.timesheetR=new TimesheetResponseDTO(this.id,'',new Date(),0);
        this.username=this.basicAuthenticationService.getAuthenticatedUser();
        if(this.id!=-1){
            this.timesheetService.retrieveTimesheet(this.username,this.id)
            .subscribe((data)=>{
                this.timesheet=data;
                //this.timesheet.loginDate=new Date(this.timesheet.loginDate);
let jsDate = new Date(data.loginDate);
// Note: toISOString() converts to UTC time. Ensure this is the desired behavior.
//let formattedDate = jsDate.toISOString().slice(0, 10);
//console.log(formattedDate); // Output: 2025-12-23
//this.timesheet.loginDate=data.loginDate;
                console.log("retrieved timesheet: "+this.timesheet.project+" "+
                    this.timesheet.loggedHr+" "+this.timesheet.loginDate);
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