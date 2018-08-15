//#region Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedIn } from '@routeguards/logged-in';
import { GridConfigComplete } from '@routeguards/grid-config-complete';
import { FlashCardsConfigComplete } from '@routeguards/flash-cards-config-complete';

import { FlashCardsComponent } from '@components/flash-cards/flash-cards.component';
import { FlashCardsConfigComponent } from '@components/flash-cards-config/flash-cards-config.component';
import { GridComponent } from '@components/grid/grid.component';
import { GridConfigComponent } from '@components/grid-config/grid-config.component';
import { MenuComponent } from '@components/menu/menu.component';
import { UserIdComponent } from '@components/user-id/user-id.component';
//#endregion

const routes: Routes = [
  { path: '', redirectTo: 'UserIdComponent', pathMatch: 'full' },
  { path: 'user', component: UserIdComponent },
  { path: 'menu', component: MenuComponent, canActivate: [ LoggedIn ] },
  { path: 'grid-config', component: GridConfigComponent, canActivate: [ LoggedIn ] },
  { path: 'grid', component: GridComponent, canActivate: [ LoggedIn, GridConfigComplete ] },
  { path: 'flash-config', component: FlashCardsConfigComponent, canActivate: [ LoggedIn ] },
  { path: 'flash', component: FlashCardsComponent, canActivate: [ LoggedIn, FlashCardsConfigComplete ] },
  { path: '**', component: UserIdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
