import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../app.constants';

@Injectable({
    providedIn:'root'
})
export class JobDataService{
    constructor(private http:HttpClient){}

    executeDailyTimesheetReportJob(username:any){
        console.log('executing job for user:',username);
        return this.http.post(`${API_URL}/jobs/${username}/timesheet`,{})
    }
}