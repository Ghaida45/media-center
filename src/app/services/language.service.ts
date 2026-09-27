import { Injectable, effect, signal } from '@angular/core';
import { TRANSLATIONS } from '../data/translations';

export type AppLanguage = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<AppLanguage>('en');

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  get dir(): 'ltr' | 'rtl' {
    return this.lang() === 'ar' ? 'rtl' : 'ltr';
  }

  setLanguage(lang: AppLanguage) {
    this.lang.set(lang);
  }

  toggle() {
    this.lang.set(this.lang() === 'en' ? 'ar' : 'en');
  }

  t(key: string): string {
    const value = TRANSLATIONS[key];
    if (!value) return key;
    return value[this.lang()] ?? value['en'];
  }
}
