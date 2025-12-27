export interface TimesheetRequest{
    id:number,
    project:string,
    loginDate:Date,
    loggedHr:number,
    username?:string
}