import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    FieldComponent,
    MenuComponent,
    GameComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
