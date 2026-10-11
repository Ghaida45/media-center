import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

const TOAST_ICONS: Record<string, string> = {
  success: 'check_circle',
  error: 'cancel',
  warning: 'error',
};

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.css',
  templateUrl: './toast.html',
})
export class Toast {
  readonly toastService = inject(ToastService);

  icon(type: string): string {
    return TOAST_ICONS[type] ?? 'info';
  }
}
