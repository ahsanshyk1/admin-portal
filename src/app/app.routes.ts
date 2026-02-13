import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventory } from './components/inventory/inventory';
import { Report } from './components/report/report';

export const routes: Routes = [
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
