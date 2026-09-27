import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentItem, MEDIA_CONTENT_ITEMS } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';

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
  };

  constructor(
    private readonly route: ActivatedRoute,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.item = MEDIA_CONTENT_ITEMS.find((entry) => entry.id === id);
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  formatDate(date: string): string {
    const locale = this.languageService.lang() === 'ar' ? 'ar-SA' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
