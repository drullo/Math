// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// Other modules
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from '@modules/app-routing.module';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

// Route guards
import { LoggedIn } from '@routeguards/logged-in';
import { FlashCardsConfigComplete } from '@routeguards/flash-cards-config-complete';

// Components
import { AppComponent } from '@components/app/app.component';
import { GridComponent } from '@components/grid/grid.component';
import { FlashCardsComponent } from '@components/flash-cards/flash-cards.component';
import { FlashCardsConfigComponent } from '@components/flash-cards-config/flash-cards-config.component';
import { MenuComponent } from '@components/menu/menu.component';
import { UserIdComponent } from '@components/user-id/user-id.component';
import { ScoreDialogComponent } from '@components/score-dialog/score-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    MenuComponent,
    FlashCardsComponent,
    UserIdComponent,
    FlashCardsConfigComponent,
    ScoreDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,

    EmojiModule,

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center'
    })
  ],
  providers: [
    LoggedIn,
    FlashCardsConfigComplete
  ],
  entryComponents: [ ScoreDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
