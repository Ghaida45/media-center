import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentStatus, ContentItem } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';
import { ContentApi } from '../../services/content-api';

type StatusFilter = 'all' | ContentStatus;

@Component({
  imports: [RouterLink],
  selector: 'app-manage-media-content',
  styleUrl: './manage-media-content.css',
  templateUrl: './manage-media-content.html',
})
export class ManageMediaContent implements OnInit{
  constructor(readonly languageService: LanguageService) {}

  private readonly contentApi = inject(ContentApi);
  items = signal<ContentItem[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.contentApi.getAll().subscribe({
      next: (rows: any[]) => {
        this.items.set(rows.map((row) => ({
          ...row,
        })));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  displayTitle(item: ContentItem): string {
    return (this.languageService.lang() === 'ar' && item.titleAr ? item.titleAr : item.titleEn) ?? '';
  }

  readonly pageSize = 5;

  readonly statusFilters: { id: StatusFilter; key: string }[] = [
    { id: 'all', key: 'manage.filterAll' },
    { id: 'underReview', key: 'manage.filterUnderReview' },
    { id: 'approved', key: 'manage.filterApproved' },
    { id: 'rejected', key: 'manage.filterRejected' },
    { id: 'published', key: 'manage.filterPublished' },
    { id: 'hidden', key: 'manage.filterHidden' },
    { id: 'expired', key: 'manage.filterExpired' },
    { id: 'draft', key: 'manage.filterDraft' },
  ];

  readonly statusLabelKeys: Record<ContentStatus, string> = {
    draft: 'manage.filterDraft',
    underReview: 'manage.filterUnderReview',
    approved: 'manage.filterApproved',
    rejected: 'manage.filterRejected',
    published: 'manage.filterPublished',
    hidden: 'manage.filterHidden',
    expired: 'manage.filterExpired',
  };

  activeStatusFilter: StatusFilter = 'all';
  currentPage = 1;

  t(key: string): string {
    return this.languageService.t(key);
  }

  setStatusFilter(status: StatusFilter) {
    this.activeStatusFilter = status;
    this.currentPage = 1;
  }

  get filteredItems() {
    if (this.activeStatusFilter === 'all') {
      return this.items();
    }
    return this.items().filter((item) => item.status === this.activeStatusFilter);
  }

  get pagedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredItems.length / this.pageSize));
  }

  get rangeStart() {
    return this.filteredItems.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangeEnd() {
    return Math.min(this.currentPage * this.pageSize, this.filteredItems.length);
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
