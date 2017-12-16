import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { ProductListComponent } from './product-list.component';
import { CategoryTreeComponent } from '../category-tree/category-tree.component';
import { UiTreeAsideComponent } from '../category-tree/ui-tree-aside/ui-tree-aside.component';
import { UiTreeBrandAsideComponent } from '../category-tree/ui-tree-brand-aside/ui-tree-brand-aside.component';
import { CategoryTreeModule } from '../category-tree/category-tree.module';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-4.x';
import { Cloudinary } from 'cloudinary-core';
import { PaginationModule } from '../../../shared/layout/pagination/pagination.module';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    PaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductListComponent,
    CategoryTreeComponent,
    UiTreeBrandAsideComponent,
    UiTreeAsideComponent
  ]
})
export class ProductListModule { }
