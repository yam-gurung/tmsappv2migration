import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '../app.constants';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from '@angular/router'

export const AUTHENTICATED_USER='authenticaterUser';
export const TOKEN='token';

@Injectable({
    providedIn:'root'
})

export class BasicAuthenticationService{
    constructor(private http:HttpClient, private route:Router
    ){}

    private loggedIn=new BehaviorSubject<boolean>(false);

    isLoggedIn$:Observable<boolean>=this.loggedIn.asObservable();

    executeJWTAuthenticationService(username:any,password:any){
        return this.http.post<any>(`${API_URL}/authenticate`,{
            username,
            password
        }).pipe(map(data=>{
            sessionStorage.setItem(AUTHENTICATED_USER,username);
            sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
            this.loggedIn.next(true);
            return data;
        }));
    }

    getAuthenticatedUser(){
        return sessionStorage.getItem(AUTHENTICATED_USER);
    }

    getAuthenticatedToken(){
        if(this.getAuthenticatedUser())
            return sessionStorage.getItem(TOKEN);
        return null;
    }

    isUserLoggedIn(){
        let user=sessionStorage.getItem(AUTHENTICATED_USER);
        return !(user==null)
    }

    logout(){
        sessionStorage.removeItem(AUTHENTICATED_USER);
        sessionStorage.removeItem(TOKEN);
        this.loggedIn.next(false);
        //this.route.navigate(['logout']);
        //this.cdr.detectChanges();
        //this.route.navigate(['login']);
    }

}