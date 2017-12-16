import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  {
    path: 'shop',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/global/shop/shop-list/shop-list.module#ShopListModule'
      },
      {
        path: ':id',
        loadChildren: 'app/global/shop/shop-detail/shop-detail.module#ShopDetailModule'
      }
    ]
  }
];
