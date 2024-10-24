import { Routes } from '@angular/router';
import { SoftwareComponent } from './software.component';
import { SoftwareStore } from './services/software.store';
import { SoftwareDataService } from './services/software-data.service';

export const SOFTWARE_ROUTES: Routes = [
  {
    path: '',
    component: SoftwareComponent,
    providers: [SoftwareStore, SoftwareDataService],
  },
];
