import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentItem, ContentStatus, ContentType } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';
import { ContentApi } from '../../services/content-api';
import { ToastService } from '../../services/toast.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-add-media-content',
  styleUrl: './add-media-content.css',
  templateUrl: './add-media-content.html',
})
export class AddMediaContent implements OnDestroy {
  readonly allCategories = ['SDAIA', 'NDMO', 'PDPL'];
  private readonly contentApi = inject(ContentApi);
  private readonly toast = inject(ToastService);

  readonly TITLE_MIN_LENGTH = 3;
  readonly TITLE_MAX_LENGTH = 150;
  readonly BODY_MIN_LENGTH = 20;
  readonly BODY_MAX_LENGTH = 5000;

  titleArLengthError: 'short' | 'long' | null = null;
  titleEnLengthError: 'short' | 'long' | null = null;
  bodyArLengthError: 'short' | 'long' | null = null;
  bodyEnLengthError: 'short' | 'long' | null = null;

  editingId: string | null = null;
  contentType: ContentType = 'News';
  publishDate = '';
  expiryDate = '';
  titleAr = '';
  titleEn = '';
  bodyAr = '';
  bodyEn = '';
  selectedCategories = new Set<string>();
  fileName: string | null = null;
  selectedFile: File | null = null;
  filePreviewUrl: string | null = null;
  private previewUrlIsOwned = false;
  showCategoryError = false;
  showPublishDateError = false;
  showPublishDatePastError = false;
  showExpiryDateError = false;
  showTitleArError = false;
  showTitleEnError = false;
  showBodyArError = false;
  showBodyEnError = false;
  showFileError = false;
  showFileSizeError = false;
  showSubmitModal = false;
  showDraftModal = false;
  showCancelModal = false;
  submitting = signal(false);
  loading = signal(false);

  private existingSender: string | null = null;
  private existingSentDate: string | null = null;
  private existingFileUrl: string | null = null;
  private existingStatus: ContentStatus | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      this.contentApi.getOne(id).subscribe({
        next: (existing) => {
          this.editingId = existing.id;
          this.contentType = existing.type;
          // Backend returns full timestamptz strings ("2026-10-20 00:00:00+00");
          // <input type="date"> only accepts a bare "YYYY-MM-DD".
          this.publishDate = existing.publishDate?.slice(0, 10) ?? '';
          this.expiryDate = existing.expiryDate?.slice(0, 10) ?? '';
          this.titleEn = existing.titleEn ?? '';
          this.titleAr = existing.titleAr ?? '';
          this.bodyEn = existing.bodyEn ?? '';
          this.bodyAr = existing.bodyAr ?? '';
          existing.category.forEach((category) => this.selectedCategories.add(category));
          this.titleArLengthError = this.checkLength(this.titleAr, this.TITLE_MIN_LENGTH, this.TITLE_MAX_LENGTH);
          this.titleEnLengthError = this.checkLength(this.titleEn, this.TITLE_MIN_LENGTH, this.TITLE_MAX_LENGTH);
          this.bodyArLengthError = this.checkLength(this.bodyAr, this.BODY_MIN_LENGTH, this.BODY_MAX_LENGTH);
          this.bodyEnLengthError = this.checkLength(this.bodyEn, this.BODY_MIN_LENGTH, this.BODY_MAX_LENGTH);
          this.existingSender = existing.sender;
          this.existingSentDate = existing.sentDate;
          this.existingFileUrl = existing.fileUrl ?? null;
          this.fileName = existing.fileUrl ? existing.fileUrl.split('/').pop() ?? null : null;
          this.filePreviewUrl = existing.fileUrl ?? null;
          this.existingStatus = existing.status;
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    }
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  onContentTypeChange(value: ContentType) {
    this.contentType = value;

    this.publishDate = '';
    this.expiryDate = '';
    this.titleAr = '';
    this.titleEn = '';
    this.bodyAr = '';
    this.bodyEn = '';
    this.selectedCategories.clear();
    this.fileName = null;
    this.selectedFile = null;
    if (this.previewUrlIsOwned && this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
    }
    this.filePreviewUrl = null;
    this.previewUrlIsOwned = false;
    this.existingFileUrl = null;

    this.showCategoryError = false;
    this.showPublishDateError = false;
    this.showPublishDatePastError = false;
    this.showExpiryDateError = false;
    this.showTitleArError = false;
    this.showTitleEnError = false;
    this.showBodyArError = false;
    this.showBodyEnError = false;
    this.showFileError = false;
    this.showFileSizeError = false;
    this.titleArLengthError = null;
    this.titleEnLengthError = null;
    this.bodyArLengthError = null;
    this.bodyEnLengthError = null;
  }

  get todayDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  get fileAccept(): string {
    return this.contentType === 'Video' ? 'video/mp4,video/quicktime,video/x-msvideo' : 'image/jpeg,image/png,image/webp';
  }

  private get maxFileSizeBytes(): number {
    return this.contentType === 'Video' ? 400 * 1024 * 1024 : 10 * 1024 * 1024;
  }

  private acceptFile(file: File) {
    if (file.size > this.maxFileSizeBytes) {
      this.showFileSizeError = true;
      return;
    }
    this.fileName = file.name;
    this.selectedFile = file;
    this.showFileError = false;
    this.showFileSizeError = false;
    if (this.previewUrlIsOwned && this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
    }
    this.filePreviewUrl = URL.createObjectURL(file);
    this.previewUrlIsOwned = true;
  }

  ngOnDestroy() {
    if (this.previewUrlIsOwned && this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
    }
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.showCategoryError = false;
  }

  isCategorySelected(category: string) {
    return this.selectedCategories.has(category);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.acceptFile(file);
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.acceptFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  get isEditingDraft(): boolean {
    return !!this.editingId && this.existingStatus === 'draft';
  }

  cancel() {
    this.showCancelModal = true;
  }

  cancelCancelModal() {
    this.showCancelModal = false;
  }

  confirmCancel() {
    this.showCancelModal = false;
    if (this.isEditingDraft && this.editingId) {
      this.contentApi.delete(this.editingId).subscribe({
        next: () => {
          this.toast.success(this.t('add.draftDeletedSuccess'));
          this.router.navigate(['/media-center/manage']);
        },
        error: () => {
          this.toast.error(this.t('add.draftDeletedError'));
          this.router.navigate(['/media-center/manage']);
        },
      });
      return;
    }
    this.router.navigate(['/media-center/manage']);
  }

  private get hasAnyFieldFilled(): boolean {
    return (
      this.titleEn.trim() !== '' ||
      this.titleAr.trim() !== '' ||
      this.bodyEn.trim() !== '' ||
      this.bodyAr.trim() !== '' ||
      this.selectedCategories.size > 0 ||
      !!this.publishDate ||
      !!this.expiryDate ||
      !!this.selectedFile ||
      !!this.existingFileUrl
    );
  }

  private validateDates(): boolean {
    this.showPublishDatePastError = false;
    this.showExpiryDateError = false;
    if (this.publishDate && this.publishDate < this.todayDate) {
      this.showPublishDatePastError = true;
      return false;
    }
    if (this.expiryDate && this.publishDate && this.expiryDate <= this.publishDate) {
      this.showExpiryDateError = true;
      return false;
    }
    return true;
  }

  onPublishDateChange(value: string) {
    this.publishDate = value;
    this.showPublishDateError = false;
    this.validateDates();
  }

  onExpiryDateChange(value: string) {
    this.expiryDate = value;
    this.validateDates();
  }

  private checkLength(value: string, min: number, max: number): 'short' | 'long' | null {
    const len = value.trim().length;
    if (len === 0) return null;
    if (len < min) return 'short';
    if (len > max) return 'long';
    return null;
  }

  onTitleArChange(value: string) {
    this.titleAr = value;
    this.showTitleArError = false;
    this.titleArLengthError = this.checkLength(value, this.TITLE_MIN_LENGTH, this.TITLE_MAX_LENGTH);
  }

  onTitleEnChange(value: string) {
    this.titleEn = value;
    this.showTitleEnError = false;
    this.titleEnLengthError = this.checkLength(value, this.TITLE_MIN_LENGTH, this.TITLE_MAX_LENGTH);
  }

  onBodyArChange(value: string) {
    this.bodyAr = value;
    this.showBodyArError = false;
    this.bodyArLengthError = this.checkLength(value, this.BODY_MIN_LENGTH, this.BODY_MAX_LENGTH);
  }

  onBodyEnChange(value: string) {
    this.bodyEn = value;
    this.showBodyEnError = false;
    this.bodyEnLengthError = this.checkLength(value, this.BODY_MIN_LENGTH, this.BODY_MAX_LENGTH);
  }

  private get hasLengthErrors(): boolean {
    return !!(this.titleArLengthError || this.titleEnLengthError || this.bodyArLengthError || this.bodyEnLengthError);
  }

  saveAsDraft() {
    if (!this.hasAnyFieldFilled) {
      this.toast.warning(this.t('add.emptyDraftAlert'));
      return;
    }
    if (!this.validateDates()) {
      return;
    }
    if (this.hasLengthErrors) {
      return;
    }
    this.showDraftModal = true;
  }

  cancelDraftModal() {
    if (this.submitting()) return;
    this.showDraftModal = false;
  }

  confirmDraft() {
    this.submitting.set(true);
    this.save('draft');
  }

  submitForApproval() {
    if (!this.publishDate) {
      this.showPublishDateError = true;
      return;
    }
    if (!this.validateDates()) {
      return;
    }
    if (!this.titleAr.trim()) {
      this.showTitleArError = true;
      return;
    }
    if (!this.titleEn.trim()) {
      this.showTitleEnError = true;
      return;
    }
    if (this.selectedCategories.size === 0) {
      this.showCategoryError = true;
      return;
    }
    if (this.contentType === 'News' && !this.bodyAr.trim()) {
      this.showBodyArError = true;
      return;
    }
    if (this.contentType === 'News' && !this.bodyEn.trim()) {
      this.showBodyEnError = true;
      return;
    }
    if (!this.selectedFile && !this.existingFileUrl) {
      this.showFileError = true;
      return;
    }
    if (this.hasLengthErrors) {
      return;
    }
    this.showSubmitModal = true;
  }

  cancelSubmitModal() {
    if (this.submitting()) return;
    this.showSubmitModal = false;
  }

  confirmSubmit() {
    this.submitting.set(true);
    this.save('underReview');
  }

  private save(status: ContentStatus) {
    const today = new Date().toISOString().slice(0, 10);

    const buildItem = (fileUrl: string | undefined): Partial<ContentItem> => ({
      titleEn: this.titleEn,
      titleAr: this.titleAr,
      type: this.contentType,
      status: status,
      category: Array.from(this.selectedCategories),
      publishDate: this.publishDate || undefined,
      expiryDate: this.expiryDate || undefined,
      bodyEn: this.bodyEn,
      bodyAr: this.bodyAr,
      fileUrl,
      sender: this.existingSender || 'John Doe',
      sentDate: this.existingSentDate || today,
    });

    const isDraft = status === 'draft';
    const successMsg = this.t(isDraft ? 'add.draftSavedSuccess' : 'add.submitSuccess');
    const errorMsg = this.t(isDraft ? 'add.draftSavedError' : 'add.submitError');

    const createOrUpdate = (item: Partial<ContentItem>) => {
      const request = this.editingId
        ? this.contentApi.update(this.editingId, item)
        : this.contentApi.create(item);

      request.subscribe({
        next: () => {
          this.toast.success(successMsg);
          this.router.navigate(['/media-center/manage']);
        },
        error: () => {
          this.toast.error(errorMsg);
          this.submitting.set(false);
          this.showDraftModal = false;
          this.showSubmitModal = false;
        },
      });
    };

    if (this.selectedFile) {
      this.contentApi.uploadFile(this.selectedFile).subscribe({
        next: (url) => createOrUpdate(buildItem(url)),
        error: () => {
          this.toast.error(this.t('add.uploadError'));
          this.submitting.set(false);
          this.showDraftModal = false;
          this.showSubmitModal = false;
        },
      });
    } else {
      createOrUpdate(buildItem(this.existingFileUrl ?? undefined));
    }
  }
}
