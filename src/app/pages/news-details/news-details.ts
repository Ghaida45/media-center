import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NEWS_ARTICLES, NewsArticle } from '../../data/news-articles';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [RouterLink],
  selector: 'app-news-details',
  styleUrl: './news-details.css',
  templateUrl: './news-details.html',
})
export class NewsDetails {
  article: NewsArticle | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    readonly languageService: LanguageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.article = NEWS_ARTICLES.find((item) => item.id === id);
  }

  t(key: string): string {
    return this.languageService.t(key);
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
