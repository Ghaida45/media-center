import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto.js';
import { UpdateContentDto } from './dto/update-content.dto.js';
import { db } from '../../prisma/db.js';

@Injectable()
export class ContentService {
  create(createContentDto: CreateContentDto) {
    return db.orm.public.ContentItem.create(createContentDto);
  }

  findAll() {
    return db.orm.public.ContentItem.where({}).all();
  }

  findOne(id: string) {
    return db.orm.public.ContentItem.where({id}).first();
  }

  update(id: string, updateContentDto: UpdateContentDto) {
    return db.orm.public.ContentItem.where({id}).update(updateContentDto);
  }

  remove(id: string) {
    return db.orm.public.ContentItem.where({id}).delete();
  }
}
