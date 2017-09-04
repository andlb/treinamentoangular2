
import { AuthService } from './../auth.service';
import { Injectable }       from '@angular/core';
import { Acesso } from './../../share/acesso.model';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
  redirectUrl;
  acesso:Acesso = new Acesso();

  constructor(
      private authService: AuthService,
      private router: Router) {}

  canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): boolean {
    if (this.authService.loggedIn()){
      return this.acesso.getAcesso(state.url);
    }else{
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }

  }
}
