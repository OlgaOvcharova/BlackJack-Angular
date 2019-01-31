import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { DeckService } from './services/deck.service';
import { ErrorComponent } from './error/error.component';
import { FieldComponent } from './field/field.component';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    FieldComponent,
    GameComponent,
    MenuComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
