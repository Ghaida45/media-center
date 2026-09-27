import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Parallax } from 'swiper/modules';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit {
  @ViewChild('firstSlider') firstSlider!: ElementRef<HTMLElement>;
  @ViewChild('secondSlider') secondSlider!: ElementRef<HTMLElement>;

  isVideoModalOpen = false;

  constructor(readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.t(key);
  }

  ngAfterViewInit() {
    this.initSwiper(this.firstSlider.nativeElement, {
      parallax: true,
      autoplay: true,
      slidesPerView: 1,
    });
    this.initSwiper(this.secondSlider.nativeElement, {
      parallax: false,
      autoplay: false,
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      },
    });
  }

  private initSwiper(
    container: HTMLElement,
    options: {
      parallax: boolean;
      autoplay: boolean;
      slidesPerView: number;
      spaceBetween?: number;
      breakpoints?: Record<number, { slidesPerView: number }>;
    },
  ) {
    const swiperEl = container.querySelector<HTMLElement>('.swiper');
    const paginationEl = container.querySelector<HTMLElement>('.pagination-buttons');
    if (!swiperEl) return;

    new Swiper(swiperEl, {
      modules: [Navigation, Pagination, Parallax],
      speed: 600,
      loop: true,
      slidesPerView: options.slidesPerView,
      spaceBetween: options.spaceBetween,
      breakpoints: options.breakpoints,
      parallax: options.parallax,
      autoplay: options.autoplay ? { delay: 6000 } : false,
      pagination: paginationEl
        ? {
            el: paginationEl,
            clickable: true,
          }
        : false,
    });
  }

  openVideoModal() {
    this.isVideoModalOpen = true;
  }

  closeVideoModal() {
    this.isVideoModalOpen = false;
  }
}
