import { Component } from '@angular/core';
import { Header } from "../header/header";
import { NzLayoutModule, NzSiderComponent } from 'ng-zorro-antd/layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [Header, NzLayoutModule, RouterLink, RouterLinkActive, NzSiderComponent, NzIconModule, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.less',
})
export class Nav {
  // sidebar.component.ts
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    { label: 'Inventory', icon: 'database', link: '/inventory' },
    // { label: 'Warehouses', icon: 'home', link: '/warehouses' },
    { label: 'Orders', icon: 'shopping-cart', link: '/orders' },
    { label: 'Suppliers', icon: 'team', link: '/suppliers' },
    { label: 'Reports', icon: 'bar-chart', link: '/reports' },
    { label: 'Maintenance', icon: 'tool', link: '/maintenance' },
    { label: 'Users', icon: 'user', link: '/users' },
    { label: 'Settings', icon: 'setting', link: '/settings' },
    { label: 'Login', icon: 'login', link: '/login' }
    { label: 'Sales', icon: 'shopping', link: '/sales' },
    // { label: 'Users', icon: 'user', link: '/users' },
    // { label: 'Settings', icon: 'setting', link: '/settings' },
  ];

}
