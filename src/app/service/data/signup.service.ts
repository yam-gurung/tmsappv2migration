import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JPA_API_URL, SIGNUP_JPA_API_URL} from '../../app.constants';
import {SecurityUser} from '../../listusers/listusers';
@Injectable({
    providedIn:'root'
})
export class SignupService{
    constructor(private http:HttpClient){}

    signup(securityUser:SecurityUser){
        return this.http.post(
            `${SIGNUP_JPA_API_URL}/users`,securityUser
        );
    }
}