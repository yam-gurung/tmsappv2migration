import {Component,OnInit} from '@angular/core';

@Component({
    selector:'app-jobsuccess',
    imports:[],
    templateUrl:'./jobsuccess.html',
    styleUrl:'./jobsuccess.css'
})
export class JobSuccess implements OnInit{
    jobSuccessMessage!:string;
    ngOnInit(){
        this.jobSuccessMessage="Your job has been successfully submitted!!";
    }
}