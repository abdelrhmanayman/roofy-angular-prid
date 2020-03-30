import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../../questionnaire/questionnaire.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  stepOne: FormGroup;

  autocompleteInput: string;
  queryWait: boolean;

  options: any;

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

    let address = localStorage.getItem('address');

    this.stepOne = this.fb.group({
      address: ['']
    });

    if (this.questionnaireService.questionnaireForm) {
      this.stepOne.patchValue({address});
    }
  }

  handleAddressChange(Event) {
    localStorage.setItem('address', Event.formatted_address);
  }

  // Submits step one form
  submit({ value, valid }) {
    setTimeout(() => {
      this.router.navigate(['front-picture']);
    }, 100);
  }

}

