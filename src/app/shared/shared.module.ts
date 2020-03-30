import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioBtnComponent } from './ui/radio-btn/radio-btn.component';
import { NavigationCtrlComponent } from './ui/navigation-ctrl/navigation-ctrl.component';
import { FormHeaderComponent } from './ui/form-header/form-header.component';
import { PageNavigationComponent } from './page-navigation/page-navigation.component';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RadioBtnComponent, NavigationCtrlComponent, FormHeaderComponent, PageNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [NgbModule, RadioBtnComponent, NavigationCtrlComponent, FormHeaderComponent, PageNavigationComponent]
})
export class SharedModule { }
