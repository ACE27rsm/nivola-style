import { Component, inject } from '@angular/core';
import { MotoItService } from '../../serivces/moto-it.service';
import { IAnnouncement } from '../../types/Types';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  isLoading = true;
  motoItService = inject(MotoItService);
  announcement: IAnnouncement | null = null;
  annuncementId: string = '';
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.isLoading = true;
    this.annuncementId = this.route.snapshot.params['announcementId'];
    this.motoItService
      .getAnnouncementDetails(this.annuncementId)
      .then((announcement) => {
        this.announcement = announcement;
        console.log('AA', this.announcement);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
