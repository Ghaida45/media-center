import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NEWS_ARTICLES } from '../../data/news-articles';
import { LanguageService } from '../../services/language.service';
import { UserRoleService } from '../../services/user-role.service';

interface MediaItem {
  id?: string;
  title: string;
  tags: string[];
  date: string;
  isVideo?: boolean;
  bodyParagraphs?: string[];
  hidden?: boolean;
}

type TabId = 'news' | 'photos' | 'videos';
type SortOrder = 'newest' | 'oldest';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-media-center',
  styleUrl: './media-center.css',
  templateUrl: './media-center.html',
})
export class MediaCenter {
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
  activeTagFilters = new Set<string>();
  searchQuery = '';
  visibleCount = 3;
  openPhoto: MediaItem | null = null;
  openVideo: MediaItem | null = null;
  isAdvancedFilterOpen = false;
  isSortOpen = false;
  dateFrom = '';
  dateTo = '';

  readonly allTags = ['SDAIA', 'NDMO', 'PDPL'];
  readonly contentStatuses = ['Published', 'Hidden'];
  activeStatusFilters = new Set<string>();

  readonly demoVideoUrl =
    'https://dgp.sdaia.gov.sa/wps/wcm/connect/6c82404a-daec-4583-8de3-472540655d43/%D8%A2%D9%84%D9%8A%D8%A9+%D8%AA%D9%82%D8%AF%D9%8A%D9%85+%D8%A7%D9%84%D8%B4%D9%83%D9%88%D9%89+%D9%84%D9%85%D8%AE%D8%A7%D9%84%D9%81%D8%A7%D8%AA+%D8%A3%D8%AD%D9%83%D8%A7%D9%85+%D9%86%D8%B8%D8%A7%D9%85+%D8%AD%D9%85%D8%A7%D9%8A%D8%A9+%D8%A7%D9%84%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA+%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A9.mp4?MOD=AJPERES&CACHEID=ROOTWORKSPACE-6c82404a-daec-4583-8de3-472540655d43-p-ERbS6';

  news: MediaItem[] = NEWS_ARTICLES;

  photos: MediaItem[] = [
    { title: 'National Data Governance Platform Launch Event', tags: ['NDMO'], date: '2026-08-03' },
    { title: 'PDPL Compliance Workshop Gallery', tags: ['PDPL'], date: '2026-08-06' },
    { title: 'SDAIA Annual Data Forum', tags: ['SDAIA', 'NDMO'], date: '2026-08-10' },
    { title: 'Signing Ceremony with International Partners', tags: ['SDAIA'], date: '2026-08-13' },
    { title: 'National Data Center Facility Tour', tags: ['NDMO'], date: '2026-08-16' },
    { title: 'Personal Data Protection Awareness Campaign', tags: ['PDPL'], date: '2026-08-20' },
  ];

  videos: MediaItem[] = [
    {
      title: 'Speech by the Office Head at the National Data Governance Conference',
      tags: ['NDMO'],
      date: '2026-08-12',
      isVideo: true,
    },
    {
      title: 'Explaining the Personal Data Protection System',
      tags: ['PDPL'],
      date: '2026-08-18',
      isVideo: true,
    },
    {
      title: 'Virtual Tour of the National Data Center',
      tags: ['NDMO'],
      date: '2026-08-06',
      isVideo: true,
    },
    {
      title: 'SDAIA Leadership Panel on Data Governance',
      tags: ['SDAIA'],
      date: '2026-08-14',
      isVideo: true,
    },
    {
      title: 'How to Register on the National Data Governance Platform',
      tags: ['NDMO', 'PDPL'],
      date: '2026-08-19',
      isVideo: true,
    },
    {
      title: 'Highlights from the Data Governance Forum 2026',
      tags: ['SDAIA', 'NDMO'],
      date: '2026-08-16',
      isVideo: true,
    },
  ];

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

  toggleTagFilter(tag: string) {
    if (this.activeTagFilters.has(tag)) {
      this.activeTagFilters.delete(tag);
    } else {
      this.activeTagFilters.add(tag);
    }
    this.visibleCount = 3;
  }

  isTagFilterActive(tag: string) {
    return this.activeTagFilters.has(tag);
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
    this.activeTagFilters.clear();
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

  openPhotoLightbox(item: MediaItem) {
    if (this.activeTab === 'photos') {
      this.openPhoto = item;
    }
  }

  closePhotoLightbox() {
    this.openPhoto = null;
  }

  openVideoLightbox(item: MediaItem) {
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

  itemPendingVisibilityChange: MediaItem | null = null;

  toggleHidden(item: MediaItem, event: Event) {
    event.stopPropagation();
    this.itemPendingVisibilityChange = item;
  }

  cancelVisibilityChange() {
    this.itemPendingVisibilityChange = null;
  }

  confirmVisibilityChange() {
    if (!this.itemPendingVisibilityChange) return;
    this.itemPendingVisibilityChange.hidden = !this.itemPendingVisibilityChange.hidden;
    this.itemPendingVisibilityChange = null;
  }

  onCardClick(item: MediaItem) {
    if (this.activeTab === 'news' && item.id) {
      this.router.navigate(['/media-center', item.id]);
    } else if (this.activeTab === 'photos') {
      this.openPhotoLightbox(item);
    } else if (this.activeTab === 'videos') {
      this.openVideoLightbox(item);
    }
  }

  private get currentItems(): MediaItem[] {
    switch (this.activeTab) {
      case 'news':
        return this.news;
      case 'photos':
        return this.photos;
      case 'videos':
        return this.videos;
      default:
        return this.news;
    }
  }

  get filteredItems(): MediaItem[] {
    const query = this.searchQuery.trim().toLowerCase();

    const isAdmin = this.userRoleService.role() === 'admin';

    const filtered = this.currentItems.filter((item) => {
      const matchesVisibility = isAdmin || !item.hidden;
      const matchesTags =
        this.activeTagFilters.size === 0 || item.tags.some((tag) => this.activeTagFilters.has(tag));
      const matchesStatus =
        !isAdmin ||
        this.activeStatusFilters.size === 0 ||
        (this.activeStatusFilters.has('Published') && !item.hidden) ||
        (this.activeStatusFilters.has('Hidden') && !!item.hidden);
      const matchesSearch = !query || item.title.toLowerCase().includes(query);
      const matchesFrom = !this.dateFrom || item.date >= this.dateFrom;
      const matchesTo = !this.dateTo || item.date <= this.dateTo;
      return matchesVisibility && matchesTags && matchesStatus && matchesSearch && matchesFrom && matchesTo;
    });

    return filtered.sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return this.sortOrder === 'newest' ? -diff : diff;
    });
  }

  get visibleItems(): MediaItem[] {
    return this.filteredItems.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.visibleCount < this.filteredItems.length;
  }

  formatDate(date: string): string {
    const locale = this.languageService.lang() === 'ar' ? 'ar-SA' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  statusFilterLabel(status: string): string {
    return status === 'Published' ? this.t('media.published') : this.t('media.hiddenStatus');
  }
}
