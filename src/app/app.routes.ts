import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventory } from './components/inventory/inventory';
import { Report } from './components/report/report';
import { Login } from './components/login/login';
import { SalesComponent } from './components/sales/sales';
import { AddSale } from './components/sales/add-sale/add-sale';
import { loginGuard } from '../guards/login.guard';
import { userGuard } from '../guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [userGuard],
  },
  {
    path: 'inventory',
    component: Inventory,
    canActivate: [userGuard],

  },
  {
    path: 'reports',
    component: Report,
    canActivate: [userGuard],

  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [userGuard],

  },
  {
    path: 'add-sales',
    component: AddSale
  }
];
