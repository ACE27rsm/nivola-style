import { Component, inject } from '@angular/core';
import { MotoItService } from '../serivces/moto-it.service';
import { IAnnouncement } from '../../types/Types';

@Component({
  selector: 'app-usato',
  imports: [],
  templateUrl: './usato.component.html',
  styleUrl: './usato.component.css',
})
export class UsatoComponent {
  motoItService = inject(MotoItService);
  isFetching = true;
  announcements: IAnnouncement[] = [];

  constructor() {
    console.log('PIPPO', this.motoItService);
    this.isFetching = true;
    this.motoItService
      .getAnnouncements()
      .then((announcements) => {
        this.announcements = announcements;
      })
      .finally(() => {
        this.isFetching = false;
      });
  }
}
