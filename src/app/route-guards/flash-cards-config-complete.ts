import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ConfigService } from '@services/config.service';

@Injectable()
export class FlashCardsConfigComplete implements CanActivate {

  constructor(private config: ConfigService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.config.questions || this.config.questions.length === 0) {
          this.router.navigate(['/flash-config']);
      }

      return true;
  }
}
