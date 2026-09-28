import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  isStampOpen = false;
  isNavOpen = false;
  isLoggedIn = false;

  constructor(readonly languageService: LanguageService) {}

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleLanguage(event: Event) {
    event.preventDefault();
    this.languageService.toggle();
  }

  t(key: string): string {
    return this.languageService.t(key);
  }
}
