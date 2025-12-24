import {Component, OnInit} from '@angular/core';

@Component({
    selector:'app-error',
    imports:[],
    templateUrl:'./error.html',
    styleUrl:'./error.css'
})
export class ErrorComponent implements OnInit{

    errorMessage!:string
    ngOnInit(): void {
        this.errorMessage='An unexpected error occured! Contact suppport at ***-***'
    }
}