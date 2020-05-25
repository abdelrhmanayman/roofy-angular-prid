import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    const value_address = localStorage.getItem('address');

    this.stepOne = this.fb.group({
      address: [value_address || '', [Validators.required]]
    });
  }

  handleAddressChange(Event) {
    localStorage.setItem('address', Event.formatted_address);
  }

  // Submits address
  submit() {
    setTimeout(() => {
      this.router.navigate(['front-elevation']);
    }, 100);
  }

}

