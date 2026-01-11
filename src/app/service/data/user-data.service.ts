import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JPA_API_URL, SIGNUP_JPA_API_URL} from '../../app.constants';
import {SecurityUser, UserDTO} from '../../listusers/listusers';

interface PaginatedResponse<T>{
    content:T[];
    totalElements:number;
    totalPages:number;
    number:number;
    size:number;
}

@Injectable({
    providedIn:'root'
})
export class UserDataService{
    constructor(private http:HttpClient){}

    signup(securityUser:SecurityUser){
        return this.http.post(
            `${SIGNUP_JPA_API_URL}/users`,securityUser
        );
    }

     getAllUsers(paramRequest:any){
        const params=paramRequest;
        return this.http.get<any>(
            `${JPA_API_URL}/users`,{params}
        )
    }
}