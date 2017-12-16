import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewShopComponent } from './review-shop.component';
import { SharedModule } from '../../shared/module/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ReviewShopComponent
  ],
  declarations: [ReviewShopComponent]
})
export class ReviewShopModule { }
