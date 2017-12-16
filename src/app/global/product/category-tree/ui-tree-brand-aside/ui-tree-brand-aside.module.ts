import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/module/shared.module';
import { UiTreeBrandAsideComponent } from './ui-tree-brand-aside.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [UiTreeBrandAsideComponent]
})
export class UiTreeBrandAsideModule { }
