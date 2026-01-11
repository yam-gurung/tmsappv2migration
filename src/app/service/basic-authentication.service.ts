import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '../app.constants';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from '@angular/router'
import {jwtDecode} from 'jwt-decode';

export const AUTHENTICATED_USER='authenticaterUser';
export const TOKEN='token';
export const ROLE='role';

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
            this.decodeToken(data.token);
            this.loggedIn.next(true);
            return data;
        }));
    }

    decodeToken(token:string){
        try{
            const decodeToken:any=jwtDecode(token);
            sessionStorage.setItem(ROLE,decodeToken.roles[0]);
            console.log("token roles",decodeToken.roles[0])
        }catch(e){

        }
    }

    getUseRole(){
        return sessionStorage.getItem(ROLE);
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
        sessionStorage.removeItem(ROLE);
        this.loggedIn.next(false);
    }

}