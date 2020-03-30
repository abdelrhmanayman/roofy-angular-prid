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
    let front_picture = localStorage.getItem('front_picture');
    let back_picture = localStorage.getItem('back_picture');
    let rear_picture = localStorage.getItem('rear_picture');
    let additional_picture = localStorage.getItem('additional_picture');

    let object = {
      "address": address,
      "front_picture": front_picture,
      "back_picture": back_picture,
      "rear_picture": rear_picture,
      "additional_picture": additional_picture
    }

    Object.assign(this.questionnaireService.questionnaireForm, value, object);

    this.questionnaireService.submitQuestionnaire(this.questionnaireService.questionnaireForm)
      .subscribe((succ) => {
        localStorage.clear();
        window.location.href = 'https://payment.roofy.com/order-estimate/';
      }, (err) => {
        this.errorMessage = 'This form has not been submitted. Please try again.'
        setTimeout(() => {
          this.errorMessage = false;
          this.router.navigate(['welcome/home']);
        }, 6000)
      }
      );
  }

  // Back
  back() {
    this.router.navigate(['additional-picture']);
  }

}


