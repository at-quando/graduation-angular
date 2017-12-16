import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiTreeComponent } from './ui-tree.component';
import { SharedModule } from '../../module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [UiTreeComponent],
  exports: [UiTreeComponent]
})
export class UiTreeModule { }
