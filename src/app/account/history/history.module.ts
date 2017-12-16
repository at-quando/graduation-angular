import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { HistoryComponent } from './history.component';


const routes: Routes = [
  {
    path: '',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ HistoryComponent ]
})
export class HistoryModule { }
