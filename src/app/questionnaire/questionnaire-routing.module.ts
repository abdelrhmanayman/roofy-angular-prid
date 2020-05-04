import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepOneComponent } from './step-one/step-one.component';
import { UploadPicturesComponent } from './upload-pictures/upload-pictures.component';
import { BackPictureComponent } from './back-picture/back-picture.component';
import { RearPictureComponent } from './rear-picture/rear-picture.component';
import { AdditionalPictureComponent } from './additional-picture/additional-picture.component';
import { StepTwentysevenComponent } from './step-twentyseven/step-twentyseven.component';

const routes: Routes = [
  {
    path: '',
    component: StepOneComponent
  },
  {
    path: 'front-elevation',
    component: UploadPicturesComponent
  },
  {
    path: 'right-elevation',
    component: BackPictureComponent
  },
  {
    path: 'rear-elevation',
    component: RearPictureComponent
  },
  {
    path: 'left-elevation',
    component: AdditionalPictureComponent
  },
  {
    path: 'additional-information',
    component: StepTwentysevenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }

