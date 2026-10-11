import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentItem } from '../../data/media-content-items';
import { ContentApi } from '../../services/content-api';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [RouterLink],
  selector: 'app-news-details',
  styleUrl: './news-details.css',
  templateUrl: './news-details.html',
})
export class NewsDetails {
  private readonly contentApi = inject(ContentApi);

  article: ContentItem | undefined;
  loading = signal(true);

  constructor(
    private readonly route: ActivatedRoute,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contentApi.getOne(id).subscribe({
        next: (item) => {
          this.article = item;
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    } else {
      this.loading.set(false);
    }
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  displayTitle(item: ContentItem): string {
    return (this.languageService.lang() === 'ar' && item.titleAr ? item.titleAr : item.titleEn) ?? '';
  }

  displayBody(item: ContentItem): string {
    return (this.languageService.lang() === 'ar' && item.bodyAr ? item.bodyAr : item.bodyEn) ?? '';
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const locale = this.languageService.lang() === 'ar' ? 'ar-SA' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
