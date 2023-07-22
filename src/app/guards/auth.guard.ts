import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuxFnsService } from '../services/aux-fns.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router, private auxFns: AuxFnsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const isUserLoggedIn = this.authSvc.getCurrentUserRole();
    const isRecoverPasswordPage = state.url.includes('/recover-password') && state.url.includes('access_token') 
      && state.url.includes('refresh_token') && state.url.includes('expires_in') 
      && state.url.includes('token_type') && state.url.includes('type=recovery');

    if (!isUserLoggedIn && isRecoverPasswordPage) {
      return true;
    } else if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
