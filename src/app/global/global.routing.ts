import { Routes } from '@angular/router';
import { productRoutes } from './product/product.routing';
import { shopRoutes } from './shop/shop.routing';

export const globalRoutes: Routes = [
  {
    path: '',
    data: { withoutComp: true },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/global/home/home.module#HomeModule'
      },
      {
        path: 'order',
        pathMatch: 'full',
        loadChildren: 'app/global/order/order.module#OrderModule'
      },
      ...shopRoutes,
      ...productRoutes
    ]
  }
];
