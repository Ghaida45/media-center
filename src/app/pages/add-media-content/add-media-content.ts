import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentItem, ContentStatus, ContentType, MEDIA_CONTENT_ITEMS } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-add-media-content',
  styleUrl: './add-media-content.css',
  templateUrl: './add-media-content.html',
})
export class AddMediaContent {
  readonly allTags = ['SDAIA', 'NDMO', 'PDPL'];

  editingId: string | null = null;
  contentType: ContentType = 'News';
  publishDate = '';
  expiryDate = '';
  titleAr = '';
  titleEn = '';
  bodyAr = '';
  bodyEn = '';
  selectedTags = new Set<string>();
  fileName: string | null = null;
  showCategoryError = false;
  showSubmitModal = false;
  showDraftModal = false;
  showCancelModal = false;

  private existingSender: string | null = null;
  private existingSentDate: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existing = MEDIA_CONTENT_ITEMS.find((item) => item.id === id);
      if (existing) {
        this.editingId = existing.id;
        this.contentType = existing.type;
        this.publishDate = existing.date;
        this.expiryDate = existing.expiryDate ?? '';
        this.titleEn = existing.title;
        this.titleAr = existing.titleAr ?? '';
        this.bodyEn = existing.bodyParagraphs.join('\n\n');
        this.bodyAr = existing.bodyAr ?? '';
        existing.tags.forEach((tag) => this.selectedTags.add(tag));
        this.existingSender = existing.sender;
        this.existingSentDate = existing.sentDate;
      }
    }
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  private get isAr(): boolean {
    return this.languageService.lang() === 'ar';
  }

  get titleWord(): string {
    if (this.contentType === 'Photo') return 'Photo';
    if (this.contentType === 'Video') return 'Video';
    return 'Content';
  }

  private get titleNounAr(): string {
    if (this.contentType === 'Photo') return 'الصورة';
    if (this.contentType === 'Video') return 'الفيديو';
    return 'المحتوى';
  }

  private get bodyNounAr(): string {
    if (this.contentType === 'Photo') return 'محتوى الصورة';
    if (this.contentType === 'Video') return 'محتوى الفيديو';
    return 'المحتوى';
  }

  get titleArabicLabel(): string {
    return this.isAr ? `عنوان ${this.titleNounAr} (عربي) *` : `${this.titleWord} title (Arabic) *`;
  }

  get titleEnglishLabel(): string {
    return this.isAr ? `عنوان ${this.titleNounAr} (إنجليزي) *` : `${this.titleWord} title (English) *`;
  }

  get titleArPlaceholder(): string {
    return this.isAr
      ? `أدخل عنوان ${this.titleNounAr} باللغة العربية`
      : `Enter ${this.titleWord.toLowerCase()} title in Arabic`;
  }

  get titleEnPlaceholder(): string {
    return this.isAr
      ? `أدخل عنوان ${this.titleNounAr} باللغة الإنجليزية`
      : `Enter ${this.titleWord.toLowerCase()} title in English`;
  }

  get bodyArabicLabel(): string {
    return this.isAr ? `${this.bodyNounAr} (عربي) *` : `${this.bodyWord} (Arabic) *`;
  }

  get bodyEnglishLabel(): string {
    return this.isAr ? `${this.bodyNounAr} (إنجليزي) *` : `${this.bodyWord} (English) *`;
  }

  get bodyArPlaceholder(): string {
    return this.isAr ? `أدخل ${this.bodyNounAr} باللغة العربية` : `Enter ${this.bodyWord.toLowerCase()} in Arabic`;
  }

  get bodyEnPlaceholder(): string {
    return this.isAr
      ? `أدخل ${this.bodyNounAr} باللغة الإنجليزية`
      : `Enter ${this.bodyWord.toLowerCase()} in English`;
  }

  get bodyWord(): string {
    if (this.contentType === 'Photo') return 'Photo content';
    if (this.contentType === 'Video') return 'Video content';
    return 'Content';
  }

  get fileFieldLabel(): string {
    if (this.isAr) {
      if (this.contentType === 'Photo') return 'الصورة';
      if (this.contentType === 'Video') return 'ملف الفيديو';
      return 'الصورة الرئيسية';
    }
    if (this.contentType === 'Photo') return 'Image';
    if (this.contentType === 'Video') return 'Video file';
    return 'Main image';
  }

  get fileAcceptHint(): string {
    if (this.isAr) {
      if (this.contentType === 'Video') return 'MP4, MOV, AVI — بحد أقصى 100 ميجابايت';
      if (this.contentType === 'Photo') return 'JPG, PNG, WEBP — بحد أقصى 10 ميجابايت';
      return 'JPG, PNG — بحد أقصى 10 ميجابايت';
    }
    if (this.contentType === 'Video') return 'MP4, MOV, AVI — max size 100MB';
    if (this.contentType === 'Photo') return 'JPG, PNG, WEBP — max size 10MB';
    return 'JPG, PNG — max size 10MB';
  }

  get fileAccept(): string {
    return this.contentType === 'Video' ? 'video/mp4,video/quicktime,video/x-msvideo' : 'image/jpeg,image/png,image/webp';
  }

  get fileRequired(): boolean {
    return this.contentType === 'Video';
  }

  toggleTag(tag: string) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    this.showCategoryError = false;
  }

  isTagSelected(tag: string) {
    return this.selectedTags.has(tag);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileName = input.files?.[0]?.name ?? this.fileName;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  cancel() {
    this.showCancelModal = true;
  }

  cancelCancelModal() {
    this.showCancelModal = false;
  }

  confirmCancel() {
    this.showCancelModal = false;
    this.router.navigate(['/media-center/manage']);
  }

  saveAsDraft() {
    this.showDraftModal = true;
  }

  cancelDraftModal() {
    this.showDraftModal = false;
  }

  confirmDraft() {
    this.showDraftModal = false;
    this.save('draft');
  }

  submitForApproval() {
    if (this.selectedTags.size === 0) {
      this.showCategoryError = true;
      return;
    }
    this.showSubmitModal = true;
  }

  cancelSubmitModal() {
    this.showSubmitModal = false;
  }

  confirmSubmit() {
    this.showSubmitModal = false;
    this.save('underReview');
  }

  private save(status: ContentStatus) {
    const bodyParagraphs = this.bodyEn
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const today = new Date().toISOString().slice(0, 10);

    const item: ContentItem = {
      id: this.editingId ?? this.slugify(this.titleEn || 'untitled-content'),
      title: this.titleEn,
      titleAr: this.titleAr || undefined,
      type: this.contentType,
      status,
      tags: Array.from(this.selectedTags),
      date: this.publishDate,
      expiryDate: this.expiryDate || undefined,
      bodyParagraphs,
      bodyAr: this.bodyAr || undefined,
      sender: this.existingSender ?? 'Current User',
      sentDate: status === 'underReview' ? today : (this.existingSentDate ?? today),
    };

    if (this.editingId) {
      const index = MEDIA_CONTENT_ITEMS.findIndex((entry) => entry.id === this.editingId);
      if (index !== -1) {
        MEDIA_CONTENT_ITEMS[index] = item;
      }
    } else {
      MEDIA_CONTENT_ITEMS.unshift(item);
    }

    this.router.navigate(['/media-center/manage']);
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
