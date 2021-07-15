import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../questionnaire.service';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss']
})
export class AdditionalInformationComponent implements OnInit {

  stepTwentyseven: FormGroup;

  errorMessage: any;
  successMessage: any;
  results: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) { }

  ngOnInit() {
    // Resets the form to its initial state if the form is empty
    if (Object.keys(this.questionnaireService.questionnaireForm).length == 0) {
      this.router.navigate(['/']);
    }

    this.stepTwentyseven = this.fb.group({
      thingsWeNeedToKnow: ['', [Validators.required]]
    });

    if (this.questionnaireService.questionnaireForm) {
      this.stepTwentyseven.patchValue(this.questionnaireService.questionnaireForm);
    }
  }

  private clearEmptyValues(object: object): any {
    for (let key in object) {
      if (object[key] === '' || object[key] === true || object[key] === null) {
        delete object[key]
      }
    }
  }

  // Submits additional information
  submit({ value, valid }) {
    let address = localStorage.getItem('address');
    let front_elevation = localStorage.getItem('front_elevation');
    let right_elevation = localStorage.getItem('right_elevation');
    let rear_elevation = localStorage.getItem('rear_elevation');
    let left_elevation = localStorage.getItem('left_elevation');
    let company_logo = localStorage.getItem('company_logo');
    let claimNumber = localStorage.getItem('claim_number');

    let object = {
      "address": address,
      "front_elevation": front_elevation,
      "right_elevation": right_elevation,
      "rear_elevation": rear_elevation,
      "left_elevation": left_elevation,
      "companyLogo": company_logo,
      "claimNumber": claimNumber
    }

    this.clearEmptyValues(object);

    Object.assign(this.questionnaireService.questionnaireForm, value, object);

    this.questionnaireService.submitQuestionnaire(this.questionnaireService.questionnaireForm)
      .subscribe((succ) => {
        this.successMessage = 'Please wait. Redirecting...'
        setTimeout(() => {
          this.successMessage = false;
          localStorage.clear();
          window.location.href = 'https://payment.roofy.com/order-estimate/';
        }, 6000)
      }, (err) => {
        this.errorMessage = 'This form has not been submitted. Please try again.'
        setTimeout(() => {
          this.errorMessage = false;
          this.router.navigate(['/']);
        }, 6000)
      }
      );
  }

  // Back
  back() {
    this.router.navigate(['company-information']);
  }

}


