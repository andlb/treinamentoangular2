import { AuthService } from './../auth.service';
import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{  
  redirectUrl;
  constructor(
      private authService: AuthService, 
      private router: Router) {}

  
  canActivate(
            route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): boolean {
    
    if (this.authService.loggedIn()){
      return true;
    }else{
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
    
  }
}