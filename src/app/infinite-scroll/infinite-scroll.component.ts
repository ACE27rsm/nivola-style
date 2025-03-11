import { Component, Input } from '@angular/core';
import { IInfiniteScrollItem } from '../../types/Types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll',
  imports: [CommonModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css',
})
export class InfiniteScrollComponent {
  @Input() items: IInfiniteScrollItem[] = [];
}
