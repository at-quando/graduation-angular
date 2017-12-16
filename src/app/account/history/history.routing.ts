import { Routes } from '@angular/router';

export const historyRoutes: Routes = [
  {
    path: 'history',
    loadChildren: 'app/account/history/history.module#HistoryModule'
  }
];
