import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/module/shared.module';
import { UiTreeAsideComponent } from './ui-tree-aside.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [UiTreeAsideComponent]
})
export class UiTreeAsideModule { }
