import { Injectable, signal } from '@angular/core';

export type UserRole = 'user' | 'employee' | 'admin';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
  readonly role = signal<UserRole>('employee');

  setRole(role: UserRole) {
    this.role.set(role);
  }
}
