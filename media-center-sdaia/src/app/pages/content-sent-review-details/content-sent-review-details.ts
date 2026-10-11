import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentItem } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';
import { ContentApi } from '../../services/content-api';
import { ToastService } from '../../services/toast.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-content-sent-review-details',
  styleUrl: './content-sent-review-details.css',
  templateUrl: './content-sent-review-details.html',
})
export class ContentSentReviewDetails {
  private readonly contentApi = inject(ContentApi);
  private readonly toast = inject(ToastService);

  readonly REJECTION_REASON_MIN_LENGTH = 10;
  readonly REJECTION_REASON_MAX_LENGTH = 500;

  item: ContentItem | undefined;
  loading = signal(true);
  processing = signal(false);
  showRejectModal = signal(false);
  rejectionReasonInput = signal('');
  rejectionReasonLengthError = signal<'short' | 'long' | null>(null);
  showApproveModal = signal(false);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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

  openApproveModal() {
    this.showApproveModal.set(true);
  }

  cancelApprove() {
    this.showApproveModal.set(false);
  }

  confirmApprove() {
    if (!this.item) return;
    this.processing.set(true);
    this.contentApi.update(this.item.id, { status: 'approved', rejectionReason: undefined }).subscribe({
      next: () => {
        this.showApproveModal.set(false);
        this.toast.success(this.t('reviewDetails.approveSuccess'));
        this.router.navigate(['/media-center/review']);
      },
      error: () => {
        this.toast.error(this.t('reviewDetails.approveError'));
        this.processing.set(false);
      },
    });
  }

  openRejectModal() {
    this.rejectionReasonInput.set('');
    this.rejectionReasonLengthError.set(null);
    this.showRejectModal.set(true);
  }

  cancelReject() {
    if (this.processing()) return;
    this.showRejectModal.set(false);
  }

  onRejectionReasonChange(value: string) {
    this.rejectionReasonInput.set(value);
    const len = value.trim().length;
    if (len === 0) {
      this.rejectionReasonLengthError.set(null);
    } else if (len < this.REJECTION_REASON_MIN_LENGTH) {
      this.rejectionReasonLengthError.set('short');
    } else if (len > this.REJECTION_REASON_MAX_LENGTH) {
      this.rejectionReasonLengthError.set('long');
    } else {
      this.rejectionReasonLengthError.set(null);
    }
  }

  confirmReject() {
    if (!this.item || !this.rejectionReasonInput().trim() || this.rejectionReasonLengthError()) return;
    this.processing.set(true);
    this.contentApi
      .update(this.item.id, { status: 'rejected', rejectionReason: this.rejectionReasonInput().trim() })
      .subscribe({
        next: () => {
          this.showRejectModal.set(false);
          this.toast.success(this.t('reviewDetails.rejectSuccess'));
          this.router.navigate(['/media-center/review']);
        },
        error: () => {
          this.toast.error(this.t('reviewDetails.rejectError'));
          this.processing.set(false);
        },
      });
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
