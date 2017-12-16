import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider.component';
import { SharedModule } from '../../../shared/module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [SliderComponent],
  exports: [SliderComponent]
})
export class SliderModule { }
