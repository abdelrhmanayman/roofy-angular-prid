import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { QuestionnaireForm } from '../shared/models/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  public questionnaireForm: any;

  constructor(private http: HttpClient) {
    this.questionnaireForm = {};
  }

  // Pulls submitted form information for Overview
  getLoanFormData(): QuestionnaireForm {
    return this.questionnaireForm;
  }

  public submitQuestionnaire(answers: QuestionnaireForm) {
    return this.http.post(`${environment.baseUrl}api/questionnaire`, answers);
  }
}