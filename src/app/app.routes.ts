import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventory } from './components/inventory/inventory';
import { Report } from './components/report/report';
import { SalesComponent } from './components/sales/sales';
import { AddSale } from './components/sales/add-sale/add-sale';

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
  },
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'add-sales',
    component: AddSale
  }
];
