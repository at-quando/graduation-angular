import { Routes } from '@angular/router';
import { historyRoutes } from './history/history.routing';
import { inforRoutes } from './infor/infor.routing';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../core/service/auth/auth-guard';

export const accountRoutes: Routes = [
  {
    path: 'customer',
    component: AccountComponent,
    children: [
      ...historyRoutes,
      ...inforRoutes,
      {
        path: '**',
        redirectTo: 'customer/info',
        pathMatch: 'full'
      }
    ]
  }
];
