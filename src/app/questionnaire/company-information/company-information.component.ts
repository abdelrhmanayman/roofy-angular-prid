import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { QuestionnaireService } from "../questionnaire.service";

@Component({
  selector: "app-company-information",
  templateUrl: "./company-information.component.html",
  styleUrls: ["./company-information.component.scss"],
})
export class CompanyInformationComponent implements OnInit {
  companyInformation: FormGroup;

  autocompleteInput: string;
  queryWait: boolean;

  options: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit() {
    // Resets the form to its initial state if the form is empty
    if (Object.keys(this.questionnaireService.questionnaireForm).length < 0) {
      this.router.navigate(["/"]);
    }

    const value_name = JSON.parse(localStorage.getItem("questionnaire"));
    const value_address = localStorage.getItem("claim_number");
    const customerName = localStorage.getItem("customer_name");

    this.companyInformation = this.fb.group({
      companyName: [(value_name && value_name.companyName) || ""],
      claimNumber: [value_address || ""],
      customerName: [customerName || ""],
    });

    if (this.questionnaireService.questionnaireForm) {
      this.companyInformation.patchValue(
        this.questionnaireService.questionnaireForm
      );
    }

    this.companyInformation.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "questionnaire",
        JSON.stringify(this.companyInformation.value)
      );
    });
  }

  handleAddressChange(Event) {
    localStorage.setItem("claim_number", Event.formatted_address);
  }

  handleCutomerNameChange(event) {
    localStorage.setItem("customer_name", event.customerName);
  }

  // Submits company information
  submit({ value, valid }) {
    Object.assign(this.questionnaireService.questionnaireForm, value);

    setTimeout(() => {
      this.router.navigate(["additional-information"]);
    }, 100);
  }

  // Back
  back() {
    this.router.navigate(["company-logo"]);
  }
}
