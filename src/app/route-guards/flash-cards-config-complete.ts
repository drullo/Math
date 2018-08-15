import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FlashCardsConfigService } from '@services/flash-cards-config.service';

@Injectable()
export class FlashCardsConfigComplete implements CanActivate {

  constructor(private configService: FlashCardsConfigService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.configService.questions || this.configService.questions.length === 0) {
          this.router.navigate(['/flash-config']);
      }

      return true;
  }
}
