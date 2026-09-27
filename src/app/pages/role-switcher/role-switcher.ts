import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { UserRole, UserRoleService } from '../../services/user-role.service';

@Component({
  imports: [RouterLink],
  selector: 'app-role-switcher',
  styleUrl: './role-switcher.css',
  templateUrl: './role-switcher.html',
})
export class RoleSwitcher {
  constructor(
    readonly userRoleService: UserRoleService,
    readonly languageService: LanguageService,
  ) {}

  readonly roles: { id: UserRole }[] = [{ id: 'user' }, { id: 'employee' }, { id: 'admin' }];

  t(key: string): string {
    return this.languageService.t(key);
  }

  roleLabel(id: UserRole): string {
    return this.t(`role.${id}Label`);
  }

  roleDesc(id: UserRole): string {
    return this.t(`role.${id}Desc`);
  }

  setRole(role: UserRole) {
    this.userRoleService.setRole(role);
  }
}
