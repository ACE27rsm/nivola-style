import { Component, Input } from '@angular/core';
import { IAnnouncement } from '../../types/Types';
import numberFormat from '../../utils/numberFormat';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-announcement',
  imports: [RouterModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css',
})
export class AnnouncementComponent {
  @Input() announcement!: IAnnouncement;

  get price() {
    return numberFormat(this.announcement.price, { currency: true });
  }
}
