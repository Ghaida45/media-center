export type ContentType = 'News' | 'Photo' | 'Video';
export type ContentStatus = 'draft' | 'underReview' | 'approved' | 'rejected' | 'published' | 'hidden' | 'expired';

export interface ContentItem {
  id: string;
  titleEn?: string;
  titleAr?: string;
  type: ContentType;
  status: ContentStatus;
  category: string[];
  publishDate?: string;
  expiryDate?: string;
  bodyEn?: string;
  bodyAr?: string;
  fileUrl?: string;
  rejectionReason?: string;
  sender: string;
  sentDate: string;
}