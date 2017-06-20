import { Injectable } from '@angular/core';
import {
  CanActivate, Router,  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivateChild, NavigationExtras, CanLoad, Route
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    if (!this.authService.maybeLoggedIn)
      return Observable.from([false]);
    return this.authService
      .fetchProfile()
      .map(profile => true)
      .catch(error => {
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return Observable.from([false]);
      });
  }
}
