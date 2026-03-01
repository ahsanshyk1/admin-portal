import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventory } from './components/inventory/inventory';
import { Report } from './components/report/report';
import { Login } from './components/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'inventory',
    component: Inventory
  },
  {
    path: 'reports',
    component: Report
  }
];
