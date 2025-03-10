import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import gsap from 'gsap';
import { IAnnouncement } from '../../types/Types';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { MotoItService } from '../../serivces/moto-it.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-usato',
  imports: [AnnouncementComponent, SpinnerComponent, CommonModule],
  templateUrl: './usato.component.html',
  styleUrl: './usato.component.css',
})
export class UsatoComponent {
  motoItService = inject(MotoItService);
  isLoading = true;
  announcements: IAnnouncement[] = [];

  constructor() {
    this.isLoading = true;
    this.motoItService
      .getAnnouncements()
      .then((announcements) => {
        this.announcements = announcements;

        gsap.to('.announcement', {
          scale: 1,
          duration: 0.5,
          stagger: 0.5,
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  trackByFn(index: number, announcement: IAnnouncement): string {
    return announcement.id;
  }
}
