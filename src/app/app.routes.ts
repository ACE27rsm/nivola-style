import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsatoComponent } from './usato/usato.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DetailsComponent } from './details/details.component';

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
  {
    path: 'usato/:announcementId',
    component: DetailsComponent,
    title: 'Annuncio - Nivola Style',
  },
  {
    path: 'chi-siamo',
    component: AboutUsComponent,
    title: 'Chi Siamo - Nivola Style',
  },
  {
    path: 'contatti',
    component: ContactsComponent,
    title: 'Contatti- Nivola Style',
  },
];
