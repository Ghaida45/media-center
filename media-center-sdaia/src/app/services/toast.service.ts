import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning';

export interface ToastMessage {
  text: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastMessage | null>(null);
  private timeout: ReturnType<typeof setTimeout> | null = null;

  show(text: string, type: ToastType = 'success', duration = 3000) {
    this.toast.set({ text, type });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.toast.set(null), duration);
  }

  success(text: string, duration = 3000) {
    this.show(text, 'success', duration);
  }

  error(text: string, duration = 3000) {
    this.show(text, 'error', duration);
  }

  warning(text: string, duration = 3000) {
    this.show(text, 'warning', duration);
  }
}
