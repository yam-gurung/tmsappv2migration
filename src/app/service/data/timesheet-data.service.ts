import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JPA_API_URL} from '../../app.constants';
import {TimesheetDTO, TimesheetResponseDTO} from '../../listtimesheets/listtimesheets';
import { formatDate } from '@angular/common';
import { TimesheetRequest } from '../../interfaces/timesheetrequest.interface';

@Injectable({
    providedIn:'root'
})
export class TimeSheetDataService{
    constructor(private http:HttpClient){}

    retrieveAllTimeSheets(username:any){
        return this.http.get<TimesheetResponseDTO[]>(
            `${JPA_API_URL}/users/${username}/timesheets`
        );
    }

    listTimesheets(username:any,request:any){
        const params = request;
        return this.http.get<any>(
            `${JPA_API_URL}/users/${username}/timesheets`,
            {params}
        );
    }

    deleteTimesheet(username:any,id:number){
        return this.http.delete(
            `${JPA_API_URL}/users/${username}/timesheets/${id}`
        );
    }

    retrieveTimesheet(username:any,id:number){
        return this.http.get<any>(
            `${JPA_API_URL}/users/${username}/timesheets/${id}`
        );
    }

    updateTimesheet(username:any,id:number,timesheet:TimesheetDTO){
        timesheet.loginDate = formatDate(timesheet.loginDate, 'yyyy-MM-ddTHH:mm:ss.sssZ', 'en-US');

        console.log("timesheet loginDate in service: "+timesheet.loginDate)
        
        return this.http.put(
            `${JPA_API_URL}/users/${username}/timesheets/${id}`,
          timesheet
        );
    }

    createTimesheet(username:any,timesheet:TimesheetDTO){
        console.log("date today "+new Date());
        timesheet.loginDate = formatDate(timesheet.loginDate, 'yyyy-MM-ddTHH:mm:ss.sssZ', 'en-US');

        console.log("timesheet loginDate in service: "+timesheet.loginDate)
        return this.http.post(
            `${JPA_API_URL}/users/${username}/timesheets`,
            timesheet
        );
    }

}