import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RadioBtnService {
  public radioBtns: { com: any, id: string; active: boolean, radioGroup: string }[] = [];
  public saved: { com: any, id: string; active: boolean, radioGroup: string }[] = [];
  constructor() {
  }

  public add(btn: { com: any, id: string; active: boolean, radioGroup: string; }) {
    this.radioBtns = [...this.radioBtns, btn];
  }

  public select(id) {
    // find btn
    const radioBtn = this.radioBtns.find((btn) => btn.id === id);

    // Deativate all btns
    this.radioBtns.forEach((btn) => {
      if (radioBtn.radioGroup === btn.radioGroup) {
        btn.com.inactive()
        btn.active = false;
      }
    });
    // Activete clicked btn
    radioBtn.active = true;
    radioBtn.com.active();
  }

  public reselect() {
    this.radioBtns.forEach((btn) => {
      const found = this.saved.find((btnSvd) => btnSvd.radioGroup === btn.radioGroup && btnSvd.com.value === btn.com.value && btnSvd.active);
      if (found) {
        btn.active = true;
        btn.com.active();
      }
    });
  }

  public save() {
    this.saved = this.radioBtns.reduce((oldValue, newValue: { com: any, id: string; active: boolean, radioGroup: string }) => {
      const foundBtnIndex = this.saved.findIndex((btn) => newValue.radioGroup === btn.radioGroup && newValue.com.value === btn.com.value);
      if (foundBtnIndex > -1) {
        this.saved[foundBtnIndex] = newValue;
        return this.saved;
      }
      return [...oldValue, newValue];

    }, this.saved);
    this.radioBtns = [];
  }
}
