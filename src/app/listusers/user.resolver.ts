import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UserDataService } from "../service/data/user-data.service";
import { Observable } from "rxjs";

export const userResolver:ResolveFn<any>=(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
):Observable<any>=>{
    const page=route.queryParams['page']?+route.queryParams['page']:0;
    const size=route.queryParams['size']?+route.queryParams['size']:5;
    return inject(UserDataService).getAllUsers({page:page,size:size});
}

