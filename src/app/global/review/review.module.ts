import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './review.component';
import { SharedModule } from '../../shared/module/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ReviewComponent
  ],
  declarations: [ReviewComponent]
})
export class ReviewModule { }
