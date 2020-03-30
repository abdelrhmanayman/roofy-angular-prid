import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PagesModule,
    QuestionnaireModule,
    HttpClientModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'roofy', upload_preset: 'yi7mcnof' })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

