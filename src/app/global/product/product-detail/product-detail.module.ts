import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { ProductDetailComponent } from './product-detail.component';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-4.x';
import { Cloudinary } from 'cloudinary-core';
import { ReviewModule } from '../../review/review.module';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent
  },
];

@NgModule({
  imports: [
    ReviewModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductDetailComponent
  ],
  exports: [
    ReviewModule
  ]
})

export class ProductDetailModule { }
