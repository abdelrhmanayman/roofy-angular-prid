import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from './core.component';

const routes: Routes = [
  {
      path: '',
      component: CoreComponent
  }
];

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoreModule { }
