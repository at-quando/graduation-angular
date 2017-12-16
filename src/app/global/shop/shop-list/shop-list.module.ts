import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { ShopListComponent } from './shop-list.component';
import { ShopItemComponent } from '../shop-item/shop-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShopListComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopListComponent, ShopItemComponent]
})
export class ShopListModule { }
