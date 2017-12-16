import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module/core.module';
import { Routes, RouterModule } from '@angular/router';
import { ProductModule } from './product/product.module';
// import { AsideTreeModule } from '../shared/layout/aside-tree/aside-tree.module';
import { FooterModule } from '../shared/layout/footer/footer.module';
import { NotificationModule } from '../shared/layout/notification/notification.module';
import { PaginationModule } from '../shared/layout/pagination/pagination.module';
import { UiTreeModule } from '../shared/layout/ui-tree/ui-tree.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
    FooterModule,
    RouterModule,
    // AsideTreeModule,
    NotificationModule,
    PaginationModule,
    UiTreeModule,
    ProductModule
  ]
})

export class GlobalModule { }
