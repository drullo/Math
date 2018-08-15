import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GridConfigService } from '@services/grid-config.service';

@Injectable()
export class GridConfigComplete implements CanActivate {

  constructor(private configService: GridConfigService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.configService.columns || !this.configService.rows ||
        this.configService.columns.length === 0 || this.configService.rows.length === 0) {
          this.router.navigate(['/grid-config']);
      }

      return true;
  }
}
