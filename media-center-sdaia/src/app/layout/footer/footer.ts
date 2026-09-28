import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  constructor(readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.t(key);
  }
}
