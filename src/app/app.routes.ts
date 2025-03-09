import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsatoComponent } from './usato/usato.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Nivola Style',
  },
  {
    path: 'usato',
    component: UsatoComponent,
    title: 'Usato - Nivola Style',
  },
];
