import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../questionnaire.service';

@Component({
  selector: 'app-step-twentyseven',
  templateUrl: './step-twentyseven.component.html',
  styleUrls: ['./step-twentyseven.component.scss']
})
export class StepTwentysevenComponent implements OnInit {

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
    if (Object.keys(this.questionnaireService.questionnaireForm).length < 0) {
      this.router.navigate(['welcome']);
    }

    this.stepTwentyseven = this.fb.group({
      thingsWeNeedToKNow: ['', [Validators.required]],
      additionalInformation: ['']
    });

    if (this.questionnaireService.questionnaireForm) {
      this.stepTwentyseven.patchValue(this.questionnaireService.questionnaireForm);
    }
  }

  // Submits step twentyseven form
  submit({ value, valid }) {
    let address = localStorage.getItem('address');
    let front_elevation = localStorage.getItem('front_elevation');
    let right_elevation = localStorage.getItem('right_elevation');
    let rear_elevation = localStorage.getItem('rear_elevation');
    let left_elevation = localStorage.getItem('left_elevation');

    let object = {
      "address": address,
      "front_elevation": front_elevation,
      "right_elevation": right_elevation,
      "rear_elevation": rear_elevation,
      "left_elevation": left_elevation
    }

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
    this.router.navigate(['left-elevation']);
  }

}


