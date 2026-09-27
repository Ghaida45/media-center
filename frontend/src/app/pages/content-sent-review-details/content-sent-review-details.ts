import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentItem, MEDIA_CONTENT_ITEMS } from '../../data/media-content-items';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-content-sent-review-details',
  styleUrl: './content-sent-review-details.css',
  templateUrl: './content-sent-review-details.html',
})
export class ContentSentReviewDetails {
  item: ContentItem | undefined;
  showRejectModal = signal(false);
  rejectionReasonInput = signal('');
  showApproveModal = signal(false);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.item = MEDIA_CONTENT_ITEMS.find((entry) => entry.id === id);
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  openApproveModal() {
    this.showApproveModal.set(true);
  }

  cancelApprove() {
    this.showApproveModal.set(false);
  }

  confirmApprove() {
    if (!this.item) return;
    this.item.status = 'approved';
    this.item.rejectionReason = undefined;
    this.showApproveModal.set(false);
    this.router.navigate(['/media-center/review']);
  }

  openRejectModal() {
    this.rejectionReasonInput.set('');
    this.showRejectModal.set(true);
  }

  cancelReject() {
    this.showRejectModal.set(false);
  }

  confirmReject() {
    if (!this.item || !this.rejectionReasonInput().trim()) return;
    this.item.status = 'rejected';
    this.item.rejectionReason = this.rejectionReasonInput().trim();
    this.showRejectModal.set(false);
    this.router.navigate(['/media-center/review']);
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
