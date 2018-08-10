//#region Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedIn } from '@routeguards/logged-in';
import { FlashCardsConfigComplete } from '@routeguards/flash-cards-config-complete';

import { GridComponent } from '@components/grid/grid.component';
import { MenuComponent } from '@components/menu/menu.component';
import { FlashCardsComponent } from '@components/flash-cards/flash-cards.component';
import { UserIdComponent } from '@components/user-id/user-id.component';
import { FlashCardsConfigComponent } from '@components/flash-cards-config/flash-cards-config.component';
//#endregion

const routes: Routes = [
  { path: '', redirectTo: 'UserIdComponent', pathMatch: 'full' },
  { path: 'user', component: UserIdComponent },
  { path: 'menu', component: MenuComponent, canActivate: [ LoggedIn ] },
  { path: 'grid', component: GridComponent, canActivate: [ LoggedIn ] },
  { path: 'flash-config', component: FlashCardsConfigComponent, canActivate: [ LoggedIn ] },
  { path: 'flash', component: FlashCardsComponent, canActivate: [ LoggedIn, FlashCardsConfigComplete ] },
  { path: '**', component: UserIdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
