import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';

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
