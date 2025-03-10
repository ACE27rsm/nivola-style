import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUrl: string = '';
  isMenuOpen: boolean = false;

  constructor(public location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = val.url;
        console.log(this.currentUrl);
      }
    });
  }

  onMenuClick() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      gsap.set('#drawer-container', {
        display: 'block',
      });
      gsap.to('#drawer-container .backdrop', {
        duration: 0.2,
        opacity: 1,
        pointerEvents: 'all',
        ease: 'power2.inOut',
      });
      gsap.to('#drawer-container .content', {
        duration: 0.2,
        transform: 'translateX(0)',
        ease: 'power2.inOut',
      });
    } else {
      gsap.to('#drawer-container .backdrop', {
        duration: 0.2,
        opacity: 0,
        pointerEvents: 'none',
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('#drawer-container', {
            display: 'none',
          });
        },
      });
      gsap.to('#drawer-container .content', {
        duration: 0.2,
        transform: 'translateX(100vw)',
        ease: 'power2.inOut',
      });
    }
  }
}
