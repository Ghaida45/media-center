import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ContentItem } from '../data/media-content-items';

const LIST_CACHE_TTL_MS = 15000;

@Service()
export class ContentApi {
    private readonly http = inject(HttpClient);

    private listCache: Observable<ContentItem[]> | null = null;
    private listCacheTime = 0;

    getAll(): Observable<ContentItem[]> {
        const now = Date.now();
        if (!this.listCache || now - this.listCacheTime > LIST_CACHE_TTL_MS) {
            this.listCacheTime = now;
            this.listCache = this.http.get<ContentItem[]>('http://localhost:3000/content').pipe(shareReplay(1));
        }
        return this.listCache;
    }

    private invalidateListCache() {
        this.listCache = null;
    }

    getOne(id: string) {
        return this.http.get<ContentItem>(`http://localhost:3000/content/${id}`);
    }

    create(item: Partial<ContentItem>) {
        return this.http
            .post<ContentItem>('http://localhost:3000/content', item)
            .pipe(tap(() => this.invalidateListCache()));
    }

    uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post('http://localhost:3000/content/upload', formData, { responseType: 'text' });
    }

    update(id: string, item: Partial<ContentItem>) {
        return this.http
            .patch<ContentItem>(`http://localhost:3000/content/${id}`, item)
            .pipe(tap(() => this.invalidateListCache()));
    }

    delete(id: string) {
        return this.http
            .delete<void>(`http://localhost:3000/content/${id}`)
            .pipe(tap(() => this.invalidateListCache()));
    }
}
