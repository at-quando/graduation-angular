import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { ShopDetailComponent } from './shop-detail.component';
import { ReviewShopModule } from '../../review-shop/review-shop.module';
import { PaginationModule } from '../../../shared/layout/pagination/pagination.module';

const routes: Routes = [
  {
    path: '',
    component: ShopDetailComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    PaginationModule,
    ReviewShopModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopDetailComponent]
})
export class ShopDetailModule { }
