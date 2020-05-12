import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuestionnaireService } from '../../questionnaire/questionnaire.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-back-picture',
  templateUrl: './back-picture.component.html',
  styleUrls: ['./back-picture.component.scss']
})
export class BackPictureComponent implements OnInit {
  uploadPictures: FormGroup;

  @Input()
  responses: Array<any>;

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient
  ) {
    this.responses = [];
  }

  ngOnInit() {
    // Resets the form to its initial state if the form is empty
    if (Object.keys(this.questionnaireService.questionnaireForm).length < 0) {
      this.router.navigate(['welcome']);
    }

    let right_elevation = localStorage.getItem('right_elevation');

    this.uploadPictures = this.fb.group({
      right_elevation: ['']
    });

    if (this.questionnaireService.questionnaireForm) {
      this.uploadPictures.patchValue({ right_elevation });
    }

    // Create the file uploader, wire it to upload to your account
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
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Adds Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Adds file to upload
      form.append('file', fileItem);

      // Uses default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Inserts or updates an entry in the responses array
    const upsertResponse = (fileItem: { file: any; status?: number; data: any; progress?: any; }) => {
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
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);

          // Saves a picture url to local storage
          localStorage.setItem('right_elevation', fileItem.data.secure_url);

          // Adds class to upload image label
          let element = document.getElementById('upload-label');
          element.classList.add('hide');
          element.classList.remove('show');
        } else {
          // Creates new response
          this.responses.push(fileItem);
        }
      });
    };

    // Updates model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    // Updates model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }

  // Deletes an uploaded image
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/roofy/delete_by_token`;

    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };

    this.http.post(url, body, options).subscribe((response: any) => {
      this.responses.splice(index, 1);
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
    });

    localStorage.removeItem('right_elevation');

    // Adds class to upload image label
    let element = document.getElementById('upload-label');
    element.classList.add('show');
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // Submits pictures
  submit({ value, valid }) {
    setTimeout(() => {
      this.router.navigate(['rear-elevation']);
    }, 100);
  }

  // Back
  back() {
    this.router.navigate(['front-elevation']);
  }

  // Image preview
  get right_elevation(): string {
    return localStorage.getItem('right_elevation');
  }

  public skip() {
    window.location.href = 'additional-information/';
  }

}
