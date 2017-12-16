import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavUserDirective } from '../directive/nav-user.directive';
import { SaleProductDirective } from '../directive/sale-product.directive';
import { SaleProductDetailsDirective } from '../directive/sale-product-detail.directive';
import { KeysPipe } from '../pipe/categories.pipe';
import { ReplaceBlankPipe } from '../pipe/replaceBlank.pipe';
import { PercentPipe } from '../pipe/percent.pipe';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-4.x';
import { Cloudinary } from 'cloudinary-core';
import { ListPageComponent } from '../../global/product/list-page/list-page.component';
import { NullPipe } from '../pipe/null.pipe';
import { StarModule } from '../../shared/layout/star/star.module';
import { MomentPipe } from '../pipe/momentConvert.pipe';

// tslint:disable-next-line:max-line-length
const cloud = CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'asian-tech', api_key: '829637522354547', api_secret: '8xXUcttJ7oaA1L-xGoWsuhbfBSo' } as CloudinaryConfiguration);

@NgModule({
  imports: [
    StarModule,
    CommonModule,
    FormsModule,
    RouterModule,
    cloud,
    CloudinaryModule
  ],
  declarations: [
    NavUserDirective,
    SaleProductDirective,
    SaleProductDetailsDirective,
    KeysPipe,
    PercentPipe,
    MomentPipe,
    NullPipe,
    ReplaceBlankPipe,
    ListPageComponent
  ],
  exports: [
    StarModule,
    CommonModule,
    SaleProductDirective,
    SaleProductDetailsDirective,
    FormsModule,
    PercentPipe,
    NullPipe,
    RouterModule,
    NavUserDirective,
    KeysPipe,
    ReplaceBlankPipe,
    CloudinaryModule,
    MomentPipe,
    ListPageComponent
  ]
})
export class SharedModule { }
