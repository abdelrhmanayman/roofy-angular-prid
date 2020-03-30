import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FileUploadModule } from 'ng2-file-upload';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwentysevenComponent } from './step-twentyseven/step-twentyseven.component';
import { UploadPicturesComponent } from './upload-pictures/upload-pictures.component';
import { RearPictureComponent } from './rear-picture/rear-picture.component';
import { AdditionalPictureComponent } from './additional-picture/additional-picture.component';
import { QuestionnaireComponent } from './questionnaire.component';
import { BackPictureComponent } from './back-picture/back-picture.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StepOneComponent, StepTwentysevenComponent, QuestionnaireComponent, UploadPicturesComponent, RearPictureComponent, AdditionalPictureComponent, BackPictureComponent],
  imports: [
    CommonModule,
    SharedModule,
    QuestionnaireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    FileUploadModule
  ]
})
export class QuestionnaireModule { }
