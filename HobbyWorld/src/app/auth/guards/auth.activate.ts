import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
    constructor(private authService: AuthService, private route: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        //this.route.navigate(['/auth/login']);
        return this.authService.isLogged;
    }
}