import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContentItem, ContentType } from '../../data/media-content-items';
import { ContentApi } from '../../services/content-api';
import { LanguageService } from '../../services/language.service';
import { UserRoleService } from '../../services/user-role.service';
import { ToastService } from '../../services/toast.service';

type TabId = 'news' | 'photos' | 'videos';
type SortOrder = 'newest' | 'oldest' | 'az' | 'za';

const TAB_TO_TYPE: Record<TabId, ContentType> = {
  news: 'News',
  photos: 'Photo',
  videos: 'Video',
};

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-media-center',
  styleUrl: './media-center.css',
  templateUrl: './media-center.html',
})
export class MediaCenter implements OnInit {
  private readonly contentApi = inject(ContentApi);
  private readonly toast = inject(ToastService);

  constructor(
    private readonly router: Router,
    readonly userRoleService: UserRoleService,
    readonly languageService: LanguageService,
  ) {}

  t(key: string): string {
    return this.languageService.t(key);
  }

  activeTab: TabId = 'news';
  sortOrder: SortOrder = 'newest';
  activeCategoryFilters = new Set<string>();
  searchQuery = '';
  visibleCount = 3;
  openPhoto: ContentItem | null = null;
  openVideo: ContentItem | null = null;
  isAdvancedFilterOpen = false;
  isSortOpen = false;
  dateFrom = '';
  dateTo = '';
  loading = signal(true);

  readonly allCategories = ['SDAIA', 'NDMO', 'PDPL'];
  readonly contentStatuses = ['Published', 'Hidden', 'Approved', 'Expired'];
  activeStatusFilters = new Set<string>();

  allItems = signal<ContentItem[]>([]);

  private readonly adminVisibleStatuses = ['approved', 'published', 'hidden', 'expired'];

  ngOnInit(): void {
    this.contentApi.getAll().subscribe({
      next: (rows) => {
        const isAdmin = this.userRoleService.role() === 'admin';
        this.allItems.set(
          rows.filter((item) => (isAdmin ? this.adminVisibleStatuses.includes(item.status) : item.status === 'published')),
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  displayTitle(item: ContentItem): string {
    return (this.languageService.lang() === 'ar' && item.titleAr ? item.titleAr : item.titleEn) ?? '';
  }

  displayBody(item: ContentItem): string {
    return (this.languageService.lang() === 'ar' && item.bodyAr ? item.bodyAr : item.bodyEn) ?? '';
  }

  setActiveTab(tab: TabId) {
    this.activeTab = tab;
    this.visibleCount = 3;
  }

  setSortOrder(order: SortOrder) {
    this.sortOrder = order;
    this.isSortOpen = false;
  }

  toggleSortDropdown() {
    this.isSortOpen = !this.isSortOpen;
  }

  readonly sortOrderKeys: Record<SortOrder, string> = {
    newest: 'media.sortNewest',
    oldest: 'media.sortOldest',
    az: 'media.sortAZ',
    za: 'media.sortZA',
  };

  toggleCategoryFilter(category: string) {
    if (this.activeCategoryFilters.has(category)) {
      this.activeCategoryFilters.delete(category);
    } else {
      this.activeCategoryFilters.add(category);
    }
    this.visibleCount = 3;
  }

  isCategoryFilterActive(category: string) {
    return this.activeCategoryFilters.has(category);
  }

  toggleStatusFilter(status: string) {
    if (this.activeStatusFilters.has(status)) {
      this.activeStatusFilters.delete(status);
    } else {
      this.activeStatusFilters.add(status);
    }
    this.visibleCount = 3;
  }

  isStatusFilterActive(status: string) {
    return this.activeStatusFilters.has(status);
  }

  toggleAdvancedFilter() {
    this.isAdvancedFilterOpen = !this.isAdvancedFilterOpen;
  }

  closeAdvancedFilter() {
    this.isAdvancedFilterOpen = false;
  }

  clearAdvancedFilter() {
    this.activeCategoryFilters.clear();
    this.activeStatusFilters.clear();
    this.dateFrom = '';
    this.dateTo = '';
    this.visibleCount = 3;
  }

  applyAdvancedFilter() {
    this.visibleCount = 3;
    this.isAdvancedFilterOpen = false;
  }

  loadMore() {
    this.visibleCount += 3;
  }

  openPhotoLightbox(item: ContentItem) {
    if (this.activeTab === 'photos') {
      this.openPhoto = item;
    }
  }

  closePhotoLightbox() {
    this.openPhoto = null;
  }

  openVideoLightbox(item: ContentItem) {
    if (this.activeTab === 'videos') {
      this.openVideo = item;
    }
  }

  closeVideoLightbox() {
    this.openVideo = null;
  }

  pauseThumbVideo(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.currentTime = 1;
    video.pause();
  }

  itemPendingVisibilityChange: ContentItem | null = null;
  visibilityChangeProcessing = signal(false);

  toggleHidden(item: ContentItem, event: Event) {
    event.stopPropagation();
    this.itemPendingVisibilityChange = item;
  }

  cancelVisibilityChange() {
    this.itemPendingVisibilityChange = null;
  }

  confirmVisibilityChange() {
    const item = this.itemPendingVisibilityChange;
    if (!item) return;
    const nextStatus = item.status === 'published' ? 'hidden' : 'published';
    this.visibilityChangeProcessing.set(true);
    this.contentApi.update(item.id, { status: nextStatus }).subscribe({
      next: () => {
        item.status = nextStatus;
        this.visibilityChangeProcessing.set(false);
        this.itemPendingVisibilityChange = null;
        this.toast.success(this.t(nextStatus === 'hidden' ? 'media.hideSuccess' : 'media.unhideSuccess'));
      },
      error: () => {
        this.visibilityChangeProcessing.set(false);
        this.toast.error(this.t(nextStatus === 'hidden' ? 'media.hideError' : 'media.unhideError'));
      },
    });
  }

  onCardClick(item: ContentItem) {
    if (this.activeTab === 'news') {
      this.router.navigate(['/media-center', item.id]);
    } else if (this.activeTab === 'photos') {
      this.openPhotoLightbox(item);
    } else if (this.activeTab === 'videos') {
      this.openVideoLightbox(item);
    }
  }

  private get currentItems(): ContentItem[] {
    const type = TAB_TO_TYPE[this.activeTab];
    return this.allItems().filter((item) => item.type === type);
  }

  get filteredItems(): ContentItem[] {
    const query = this.searchQuery.trim().toLowerCase();

    const isAdmin = this.userRoleService.role() === 'admin';

    const filtered = this.currentItems.filter((item) => {
      const matchesCategories =
        this.activeCategoryFilters.size === 0 || item.category.some((category) => this.activeCategoryFilters.has(category));
      const matchesStatus =
        !isAdmin ||
        this.activeStatusFilters.size === 0 ||
        (this.activeStatusFilters.has('Published') && item.status === 'published') ||
        (this.activeStatusFilters.has('Hidden') && item.status === 'hidden') ||
        (this.activeStatusFilters.has('Approved') && item.status === 'approved') ||
        (this.activeStatusFilters.has('Expired') && item.status === 'expired');
      const matchesSearch = !query || this.displayTitle(item).toLowerCase().includes(query);
      const matchesFrom = !this.dateFrom || (item.publishDate ?? '') >= this.dateFrom;
      const matchesTo = !this.dateTo || (item.publishDate ?? '') <= this.dateTo;
      return matchesCategories && matchesStatus && matchesSearch && matchesFrom && matchesTo;
    });

    return filtered.sort((a, b) => {
      if (this.sortOrder === 'az' || this.sortOrder === 'za') {
        const cmp = this.displayTitle(a).localeCompare(this.displayTitle(b));
        return this.sortOrder === 'az' ? cmp : -cmp;
      }
      const diff = new Date(a.publishDate ?? 0).getTime() - new Date(b.publishDate ?? 0).getTime();
      return this.sortOrder === 'newest' ? -diff : diff;
    });
  }

  get visibleItems(): ContentItem[] {
    return this.filteredItems.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.visibleCount < this.filteredItems.length;
  }

  readonly cardStatusLabelKeys: Partial<Record<ContentItem['status'], string>> = {
    published: 'media.published',
    hidden: 'media.hiddenStatus',
    approved: 'media.approvedStatus',
    expired: 'media.expiredStatus',
  };

  cardStatusLabel(item: ContentItem): string {
    return this.t(this.cardStatusLabelKeys[item.status] ?? 'media.hiddenStatus');
  }

  cardStatusClass(item: ContentItem): string {
    if (item.status === 'expired') return 'is-expired';
    if (item.status === 'published') return '';
    return 'is-hidden';
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

  readonly statusFilterLabelKeys: Record<string, string> = {
    Published: 'media.published',
    Hidden: 'media.hiddenStatus',
    Approved: 'media.approvedStatus',
    Expired: 'media.expiredStatus',
  };

  statusFilterLabel(status: string): string {
    return this.t(this.statusFilterLabelKeys[status]);
  }
}
