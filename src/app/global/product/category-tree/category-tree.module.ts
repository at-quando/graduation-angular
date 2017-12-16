import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/module/shared.module';
import { UiTreeAsideComponent } from './ui-tree-aside/ui-tree-aside.component';
import { UiTreeBrandAsideComponent } from './ui-tree-brand-aside/ui-tree-brand-aside.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [UiTreeBrandAsideComponent]
})
export class CategoryTreeModule { }
