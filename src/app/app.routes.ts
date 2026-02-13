import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventory } from './components/inventory/inventory';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'inventory',
    component: Inventory
  }
];
