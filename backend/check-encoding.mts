import { db } from './prisma/db.ts';

await db.orm.public.ContentItem.where({ id: '2cd51b29-1bf2-4345-b1e6-d0e45f43712f' }).delete();
console.log('deleted corrupted test row');
