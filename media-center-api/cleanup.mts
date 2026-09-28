import { db } from './prisma/db.ts';

const rows = await db.orm.public.ContentItem.where({}).all();
console.log('rows before cleanup:', rows.length);
for (const row of rows) {
  await db.orm.public.ContentItem.where({ id: row.id }).delete();
}
console.log('cleaned up all rows');
