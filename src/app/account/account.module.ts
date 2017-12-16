import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { CoreModule } from '../core/module/core.module';
import { Routes, RouterModule } from '@angular/router';
// import { AsideTreeModule } from '../shared/layout/aside-tree/aside-tree.module';
import { FooterModule } from '../shared/layout/footer/footer.module';
import { NotificationModule } from '../shared/layout/notification/notification.module';
import { PaginationModule } from '../shared/layout/pagination/pagination.module';
import { UiTreeModule } from '../shared/layout/ui-tree/ui-tree.module';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CoreModule,
    FooterModule,
    RouterModule,
    // AsideTreeModule,
    NotificationModule,
    PaginationModule,
    UiTreeModule
  ]
})

export class AccountModule { }
