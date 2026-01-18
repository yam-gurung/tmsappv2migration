import {Injectable} from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';
import {HttpClient} from '@angular/common/http';
import {JPA_API_URL} from '../../app.constants';

@Injectable({
    providedIn:'root'
})
export class TimesheetAdminDataService{
    constructor(
        private basicAuthenticationService:BasicAuthenticationService,
        private http:HttpClient){}

     listAllEmployeesTimesheets(username:any,request:any){
            const params = request;
            if(this.basicAuthenticationService.getUserRole() == 'ROLE_ADMIN'){
                return this.http.get<any>(`${JPA_API_URL}/timesheets`,{params});
            }else{
                throw new Error("Access Denied: Not an Admin User");
            }
        }
}