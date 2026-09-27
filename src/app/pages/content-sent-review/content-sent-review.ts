import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MEDIA_CONTENT_ITEMS } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [RouterLink],
  selector: 'app-content-sent-review',
  styleUrl: './content-sent-review.css',
  templateUrl: './content-sent-review.html',
})
export class ContentSentReview {
  constructor(readonly languageService: LanguageService) {}

  readonly pageSize = 5;
  currentPage = 1;

  t(key: string): string {
    return this.languageService.t(key);
  }

  readonly items = [...MEDIA_CONTENT_ITEMS].sort(
    (a, b) => new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime(),
  );

  get pagedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.items.length / this.pageSize));
  }

  get rangeStart() {
    return this.items.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangeEnd() {
    return Math.min(this.currentPage * this.pageSize, this.items.length);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
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
