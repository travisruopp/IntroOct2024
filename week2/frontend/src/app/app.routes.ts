import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { DemoComponent } from './pages/demo.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: 'banking',
    loadChildren: () =>
      import('./banking/banking.routes').then((r) => r.BANKING_ROUTES),
  },
  {
    path: 'software',
    loadChildren: () =>
      import('./software/software.routes').then((r) => r.SOFTWARE_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
