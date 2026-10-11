import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentItem } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';
import { ContentApi } from '../../services/content-api';

@Component({
  imports: [RouterLink],
  selector: 'app-content-sent-review',
  styleUrl: './content-sent-review.css',
  templateUrl: './content-sent-review.html',
})
export class ContentSentReview implements OnInit {
  private readonly contentApi = inject(ContentApi);

  constructor(readonly languageService: LanguageService) {}

  readonly pageSize = 5;
  currentPage = 1;
  items = signal<ContentItem[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.contentApi.getAll().subscribe({
      next: (rows) => {
        this.items.set([...rows].sort((a, b) => new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime()));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  displayTitle(item: ContentItem): string {
    return (this.languageService.lang() === 'ar' && item.titleAr ? item.titleAr : item.titleEn) ?? '';
  }

  get pagedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items().slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.items().length / this.pageSize));
  }

  get rangeStart() {
    return this.items().length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangeEnd() {
    return Math.min(this.currentPage * this.pageSize, this.items().length);
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
