import { Routes } from '@angular/router';

export const inforRoutes: Routes = [
  {
    path: 'info',
    loadChildren: 'app/account/infor/infor.module#InforModule'
  }
];
