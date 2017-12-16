import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarComponent } from './star.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [StarComponent],
  exports: [StarComponent]
})
export class StarModule { }
