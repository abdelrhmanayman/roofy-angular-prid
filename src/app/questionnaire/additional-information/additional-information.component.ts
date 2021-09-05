import { Component, Input, NgZone, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Cloudinary } from "@cloudinary/angular-5.x";
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from "ng2-file-upload";
import { QuestionnaireService } from "../questionnaire.service";

@Component({
  selector: "app-additional-information",
  templateUrl: "./additional-information.component.html",
  styleUrls: ["./additional-information.component.scss"],
})
export class AdditionalInformationComponent implements OnInit {
  stepTwentyseven: FormGroup;

  errorMessage: any;
  successMessage: any;
  results: any;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  uploadPictures: FormGroup;

  @Input()
  responses: Array<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private questionnaireService: QuestionnaireService
  ) {
    this.responses = [];
  }

  ngOnInit() {
    // Resets the form to its initial state if the form is empty
    if (Object.keys(this.questionnaireService.questionnaireForm).length == 0) {
      this.router.navigate(["/"]);
    }

    this.stepTwentyseven = this.fb.group({
      thingsWeNeedToKnow: ["", [Validators.required]],
      addtionalPhotos: [[]],
    });

    if (this.questionnaireService.questionnaireForm) {
      this.stepTwentyseven.patchValue(
        this.questionnaireService.questionnaireForm
      );
    }

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/roofy/upload`,
      // Uploads files automatically upon addition to upload queue
      autoUpload: true,
      // Uses xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculates progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: "X-Requested-With",
          value: "XMLHttpRequest",
        },
      ],
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Adds Cloudinary's unsigned upload preset to the upload form
      form.append("upload_preset", this.cloudinary.config().upload_preset);

      // Adds file to upload
      form.append("file", fileItem);

      // Uses default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Inserts or updates an entry in the responses array
    const upsertResponse = (fileItem: {
      file: any;
      status?: number;
      data: any;
      progress?: any;
    }) => {
      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Updates an existing entry if it's upload hasn't completed yet

        // Finds the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);

        if (existingId > -1) {
          // Updates existing item with new data
          this.responses[existingId] = Object.assign(
            this.responses[existingId],
            fileItem
          );

          debugger;
          const addtionalPhotos =
            JSON.parse(localStorage.getItem("addtional_photos") || "[]") || [];
          addtionalPhotos.push(fileItem.data.secure_url);
          // Saves a picture url to local storage
          localStorage.setItem(
            "addtional_photos",
            JSON.stringify(addtionalPhotos)
          );

          // Adds class to upload image label
          let element = document.getElementById("upload-label");
          element.classList.add("hide");
          element.classList.remove("show");
        } else {
          // Creates new response
          this.responses.push(fileItem);
        }
      });
    };

    // Updates model on completion of uploading a file
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });

    // Updates model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse({
        file: fileItem.file,
        progress,
        data: {},
      });
  }

  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/roofy/delete_by_token`;

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    });
    const options = { headers: headers };
    const body = {
      token: data.delete_token,
    };

    this.http.post(url, body, options).subscribe((response: any) => {
      this.responses.splice(index, 1);
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
    });

    localStorage.removeItem("rear_elevation");

    // Adds class to upload image label
    let element = document.getElementById("upload-label");
    element.classList.add("show");
  };

  private clearEmptyValues(object: object): any {
    for (let key in object) {
      if (object[key] === "" || object[key] === true || object[key] === null) {
        delete object[key];
      }
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // Submits additional information
  submit({ value, valid }) {
    let address = localStorage.getItem("address");
    let front_elevation = localStorage.getItem("front_elevation");
    let right_elevation = localStorage.getItem("right_elevation");
    let rear_elevation = localStorage.getItem("rear_elevation");
    let left_elevation = localStorage.getItem("left_elevation");
    let company_logo = localStorage.getItem("company_logo");
    let claimNumber = localStorage.getItem("claim_number");
    let addtionalPhotos = JSON.parse(localStorage.getItem("addtional_photos"));
    debugger
    let object = {
      address: address,
      front_elevation: front_elevation,
      right_elevation: right_elevation,
      rear_elevation: rear_elevation,
      left_elevation: left_elevation,
      companyLogo: company_logo,
      claimNumber: claimNumber,
      addtionalPhotos
    };

    this.clearEmptyValues(object);

    Object.assign(this.questionnaireService.questionnaireForm, value, object);

    this.questionnaireService
      .submitQuestionnaire(this.questionnaireService.questionnaireForm)
      .subscribe(
        (succ) => {
          this.successMessage = "Please wait. Redirecting...";
          setTimeout(() => {
            this.successMessage = false;
            localStorage.clear();
            window.location.href = "https://payment.roofy.com/order-estimate/";
          }, 6000);
        },
        (err) => {
          this.errorMessage =
            "This form has not been submitted. Please try again.";
          setTimeout(() => {
            this.errorMessage = false;
            this.router.navigate(["/"]);
          }, 6000);
        }
      );
  }

  get addtional_photos(): string {
    return JSON.parse(localStorage.getItem("addtional_photos") || "[]");
  }

  // Back
  back() {
    this.router.navigate(["company-information"]);
  }
}
