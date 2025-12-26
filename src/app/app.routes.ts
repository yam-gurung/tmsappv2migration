import { Routes } from '@angular/router';
import {Login} from './login/login';
import {Logout} from './logout/logout'
import {Signup} from './signup/signup'
import {ListTimesheets} from './listtimesheets/listtimesheets'
import {Timesheet} from './timesheet/timesheet'
import {Welcome} from './welcome/welcome'
import {Success} from './success/success'
import {ErrorComponent} from './error/error'
import {RouteGuardService} from './service/route-guard.service';

export const routes: Routes = [
    {path:"",component:Login},
    {path:"login",component:Login},
    {path:"success",component:Success,canActivate:[RouteGuardService]},
    {path:"welcome/:name",component:Welcome,canActivate:[RouteGuardService]},
    {path:"logout",component:Logout},
    {path:'signup',component:Signup,canActivate:[RouteGuardService]},
    {path:'timesheets',component:ListTimesheets,canActivate:[RouteGuardService]},
    {path:'timesheets/:id',component:Timesheet,canActivate:[RouteGuardService]},
    {path:'**',component:ErrorComponent}
];
