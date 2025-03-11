import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IInfiniteScrollItem } from '../../types/Types';
import { InfiniteScrollComponent } from '../infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, InfiniteScrollComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  photos: IInfiniteScrollItem[] = [
    {
      src: 'photos/A.png',
      alt: 'A',
      className: 'h-full rounded-lg',
      href: '',
    },
    {
      src: 'photos/B.png',
      alt: 'B',
      className: 'h-full rounded-lg',
      href: '',
    },
    {
      src: 'photos/C.png',
      alt: 'C',
      className: 'h-full rounded-lg',
      href: '',
    },
    {
      src: 'photos/D.png',
      alt: 'D',
      className: 'h-full rounded-lg',
      href: '',
    },
    {
      src: 'photos/E.png',
      alt: 'E',
      className: 'h-full rounded-lg',
      href: '',
    },
  ];
}
