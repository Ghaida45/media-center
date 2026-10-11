import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto.js';
import { UpdateContentDto } from './dto/update-content.dto.js';
import { db } from '../../prisma/db.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const STATUSES_EXEMPT_FROM_AUTO_TRANSITION = ['rejected', 'draft', 'underReview'];

@Injectable()
export class ContentService {
  create(createContentDto: CreateContentDto) {
    return db.orm.public.ContentItem.create(createContentDto);
  }

  async findAll() {
    const items = await db.orm.public.ContentItem.where({}).all();
    return Promise.all(items.map((item) => this.applyAutoStatusTransition(item)));
  }

  async findOne(id: string) {
    const item = await db.orm.public.ContentItem.where({id}).first();
    if (!item) return item;
    return this.applyAutoStatusTransition(item);
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    const updated = await db.orm.public.ContentItem.where({id}).update(updateContentDto);
    return this.applyAutoStatusTransition(updated);
  }

  remove(id: string) {
    return db.orm.public.ContentItem.where({id}).delete();
  }

  /**
   * Content has no scheduler, so publish/expiry dates are enforced lazily:
   * every read or write re-derives status from today's date and persists
   * the correction. draft/underReview/rejected never auto-transition since
   * they were never live.
   */
  private computeNextStatus(item: { status: string; publishDate?: string | null; expiryDate?: string | null }): string {
    if (STATUSES_EXEMPT_FROM_AUTO_TRANSITION.includes(item.status)) {
      return item.status;
    }
    const now = Date.now();
    if (item.expiryDate && new Date(item.expiryDate).getTime() <= now) {
      return 'expired';
    }
    if (item.status === 'approved' && item.publishDate && new Date(item.publishDate).getTime() <= now) {
      return 'published';
    }
    return item.status;
  }

  private async applyAutoStatusTransition(item: any) {
    const nextStatus = this.computeNextStatus(item);
    if (nextStatus !== item.status) {
      return db.orm.public.ContentItem.where({id: item.id}).update({status: nextStatus});
    }
    return item;
  }

  private readonly s3 = new S3Client({ forcePathStyle: true });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const extension = file.originalname.split('.').pop();
    const key = `uploads/${Date.now()}-${randomUUID()}.${extension}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: 'media-center-files',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return `${process.env.AWS_ENDPOINT_URL_S3}/media-center-files/${key}`;
  }
}
