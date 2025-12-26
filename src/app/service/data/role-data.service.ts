import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {JPA_API_URL} from '../../app.constants'
import { Role } from "../../interfaces/role.interface";

@Injectable({
    providedIn:'root'
})
export class RoleDataService{
    constructor(private http:HttpClient){}

    retrieveAllRoles(){
        return this.http.get<Role[]>(
            `${JPA_API_URL}/roles`);
    }

    createRole(role:any){
        return this.http.post(
            `${JPA_API_URL}/roles`
            ,role
        );
    }
}