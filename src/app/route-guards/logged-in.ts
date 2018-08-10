import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class LoggedIn implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const user = localStorage.getItem('lastUserName');

      if (!user) {
          this.router.navigate(['/user-id']);
      }

      return user !== undefined && user !== null;
  }
}
