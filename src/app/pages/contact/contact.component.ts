import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  public contact: FormGroup;
  public loader: boolean;
  public sub: Subscription;

  successMessage: any;
  errorMessage: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contact = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
  }

  public submit({ value, valid }) {
    this.loader = true;
    this.sub = this.http.post(`${environment.baseUrl}api/contact/contact`, value)
      .subscribe((response: any) => {
        this.loader = false;
        this.successMessage = 'Your message has been sent successfully. Thank you!';
      },
        (error) => {
          this.loader = false;
          this.errorMessage = 'Your message has not been sent!';
        })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

