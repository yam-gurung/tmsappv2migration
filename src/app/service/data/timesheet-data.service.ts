import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JPA_API_URL} from '../../app.constants';
import {TimesheetDTO, TimesheetResponseDTO} from '../../listtimesheets/listtimesheets';
import { Observable } from 'rxjs';

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
        return this.http.get<TimesheetDTO>(
            `${JPA_API_URL}/users/${username}/timesheets/${id}`
        );
    }

    updateTimesheet(username:any,id:number,timesheet:TimesheetDTO){
        return this.http.put(
            `${JPA_API_URL}/users/${username}/timesheets/${id}`,
          timesheet
        );
    }

    createTimesheet(username:any,timesheet:TimesheetDTO){
        return this.http.post(
            `${JPA_API_URL}/users/${username}/timesheets`,
            timesheet
        );
    }

}