import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../shared/shared.module';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';

import { QuestionnaireComponent } from './questionnaire.component';
import { StepOneComponent } from './step-one/step-one.component';
import { FrontPictureComponent } from './front-picture/front-picture.component';
import { RightPictureComponent } from './right-picture/right-picture.component';
import { RearPictureComponent } from './rear-picture/rear-picture.component';
import { LeftPictureComponent } from './left-picture/left-picture.component';
import { CompanyLogoComponent } from './company-logo/company-logo.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';

@NgModule({
  declarations: [
    QuestionnaireComponent,
    StepOneComponent, 
    FrontPictureComponent, 
    RightPictureComponent,
    RearPictureComponent, 
    LeftPictureComponent,  
    CompanyLogoComponent, 
    CompanyInformationComponent,
    AdditionalInformationComponent
  ],
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
