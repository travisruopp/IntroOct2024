import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'banking',
        loadChildren: () => import('./banking/banking.routes').then((r) => r.BANKING_ROUTES),
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
