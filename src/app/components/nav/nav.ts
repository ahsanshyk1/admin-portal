import { Component } from '@angular/core';
// Removes unused imports
import { inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NzIconModule, CommonModule, NzButtonModule, NzAvatarModule, NzDropDownModule],
  templateUrl: './nav.html',
  styleUrl: './nav.less',
})
export class Nav {
  private tokenKey = 'authToken';
  private router = inject(Router);
  isSidebarOpen = false;

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    { label: 'Inventory', icon: 'database', link: '/inventory' },
    { label: 'Sales', icon: 'shopping', link: '/sales' },
    { label: 'Orders', icon: 'shopping-cart', link: '/orders' },
    { label: 'Suppliers', icon: 'team', link: '/suppliers' },
    { label: 'Reports', icon: 'bar-chart', link: '/reports' },
    { label: 'Users', icon: 'user', link: '/users' },
  ];

  isAuthenticated() {
    return localStorage.getItem(this.tokenKey);
  }

  onLogout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
