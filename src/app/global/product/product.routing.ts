import { Routes } from '@angular/router';
import { ProductComponent } from './product.component';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: ':name',
        pathMatch: 'full',
        loadChildren: 'app/global/product/product-list/product-list.module#ProductListModule'
      },
      {
        path: ':name/:id',
        loadChildren: 'app/global/product/product-detail/product-detail.module#ProductDetailModule'
      }
    ]
  }
];
