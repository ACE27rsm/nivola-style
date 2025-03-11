import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IInfiniteScrollItem } from '../../types/Types';
import { InfiniteScrollComponent } from '../infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, InfiniteScrollComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  brands: IInfiniteScrollItem[] = [
    {
      src: 'brands/akrapovic.svg',
      alt: 'Akrapovic',
      className: 'h-full',
      href: 'https://www.akrapovic.com/en',
    },
    {
      src: 'brands/bardahl.png',
      alt: 'Bardahl',
      className: 'h-full',
      href: 'https://www.bardahl.it/',
    },
    {
      src: 'brands/castrol.png',
      alt: 'Castrol',
      className: 'h-full',
      href: 'https://www.castrol.com/it_it/italy/home.html',
    },
    {
      src: 'brands/givi.svg',
      alt: 'Givi',
      className: 'h-full',
      href: 'https://www.givi.it/',
    },
    {
      src: 'brands/cellularline.svg',
      alt: 'Cellularline',
      className: 'h-full',
      href: 'https://www.cellularline.com/it-it/',
    },
    {
      src: 'brands/motul.svg',
      alt: 'Motul',
      className: 'h-full',
      href: 'https://www.motul.com/it-IT',
    },
    {
      src: 'brands/rizoma.svg',
      alt: 'Rizoma',
      className: 'h-full',
      href: 'https://www.rizoma.com/',
    },
    {
      src: 'brands/termignoni.svg',
      alt: 'Termignoni',
      className: 'h-full',
      href: 'https://www.termignoni.it/',
    },
  ];
}
