import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepOneComponent } from './step-one/step-one.component';
import { FrontPictureComponent } from './front-picture/front-picture.component';
import { RightPictureComponent } from './right-picture/right-picture.component';
import { RearPictureComponent } from './rear-picture/rear-picture.component';
import { LeftPictureComponent } from './left-picture/left-picture.component';
import { CompanyLogoComponent } from './company-logo/company-logo.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';

const routes: Routes = [
  {
    path: '',
    component: StepOneComponent
  },
  {
    path: 'front-elevation',
    component: FrontPictureComponent
  },
  {
    path: 'right-elevation',
    component: RightPictureComponent
  },
  {
    path: 'rear-elevation',
    component: RearPictureComponent
  },
  {
    path: 'left-elevation',
    component: LeftPictureComponent
  },
  {
    path: 'company-logo',
    component: CompanyLogoComponent
  },
  {
    path: 'company-information',
    component: CompanyInformationComponent
  },
  {
    path: 'additional-information',
    component: AdditionalInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }

