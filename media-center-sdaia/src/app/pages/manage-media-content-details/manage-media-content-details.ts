import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentItem } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';
import { ContentApi } from '../../services/content-api';

@Component({
  imports: [RouterLink],
  selector: 'app-manage-media-content-details',
  styleUrl: './manage-media-content-details.css',
  templateUrl: './manage-media-content-details.html',
})
export class ManageMediaContentDetails {
  item: ContentItem | undefined;

  readonly statusLabelKeys: Record<ContentItem['status'], string> = {
    draft: 'manage.filterDraft',
    underReview: 'manage.filterUnderReview',
    approved: 'manage.filterApproved',
    rejected: 'manage.filterRejected',
    published: 'manage.filterPublished',
    hidden: 'manage.filterHidden',
    expired: 'manage.filterExpired',
  };

  private readonly contentApi = inject(ContentApi);
  loading = signal(true);

  constructor(
    private readonly route: ActivatedRoute,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contentApi.getOne(id).subscribe({
        next: (item) => {
          this.item = item;
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

  formatDate(date: string): string {
    if (!date) return '';
    const locale = this.languageService.lang() === 'ar' ? 'ar-SA' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
