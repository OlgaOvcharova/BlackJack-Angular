import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { ErrorComponent } from './error/error.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'game',
        component: GameComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];