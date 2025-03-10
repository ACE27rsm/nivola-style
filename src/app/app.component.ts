import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';
import gsap from 'gsap';

// * routes
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'nivola-style';
  scroll: LocomotiveScroll | null = null;
  @ViewChild('scrollContent') scrollContent: ElementRef | null = null;

  constructor(router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.scroll) {
          this.scroll.scrollTo('top');
        }
      }
    });
  }

  ngOnInit() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true,
      getDirection: true,
      lerp: 0.06,
      scrollFromAnywhere: !1,
      touchMultiplier: 2.5,
      class: 'show',
      smartphone: {
        smooth: !0,
      },
      direction: 'vertical',
    });

    this.scroll.on('scroll', (event) => {
      console.log(event);
      if (event.direction === 'down') {
        gsap.to('header', {
          y: -100,
          duration: 0.5,
          ease: 'power1.out',
        });
        gsap.to('header', {
          duration: 0.2,
          ease: 'power1.out',
          backgroundColor:
            event.scroll.y > 0
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(255, 255, 255, 0)',
        });
      } else {
        gsap.to('header', {
          y: 0,
          duration: 1,
          ease: 'power1.out',
        });
        gsap.to('header', {
          duration: 0.5,
          ease: 'power1.out',
          backgroundColor:
            event.scroll.y > 0
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(255, 255, 255, 0)',
        });
      }
    });
  }

  ngAfterViewInit() {
    const ro = new ResizeObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        const { inlineSize: width, blockSize: height } =
          entry.contentBoxSize[0];
        if (this.scroll) {
          this.scroll.update();
        }
      });
    });

    ro.observe(this.scrollContent?.nativeElement);
  }
}
