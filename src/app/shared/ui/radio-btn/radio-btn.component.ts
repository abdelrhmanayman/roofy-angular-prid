import { Component, OnInit, forwardRef, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioBtnService } from './radio-btn.service';
import * as uuid from 'uuid';


// - Text
// - Text color
// - From size
// - Icon
// - layout
// - label
// - label color
// - button size
// - button color inactive active

@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioBtnComponent),
      multi: true
    }
  ]
})
export class RadioBtnComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() value: string | number;
  @Input() padding: string;
  @Input() activeIcon: string;
  @Input() inactiveIcon: string;
  @Input() radioGroup: string = 'default';

  public selectedValue: string | number;
  public changecss: string = 'inactive';
  public id: string;

  public propagateChange = (_: any) => { };

  constructor(private radioBtnService: RadioBtnService) {
    this.id = uuid.v4();
    
  }

  ngOnInit() {
    this.radioBtnService.add({ id: this.id, com: this, active: false, radioGroup: this.radioGroup });
    this.radioBtnService.reselect();
  }

  public select(value, id) {
    this.selectedValue = value;
    this.radioBtnService.select(id);
    this.propagateChange(this.selectedValue);
  }

  public isActive() {
    return this.changecss === 'active';
  }

  public active() {
    this.changecss = 'active';
  }

  public inactive() {
    this.changecss = 'inactive';
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  public writeValue(value) {
    if (value !== undefined) {
      this.selectedValue = value;
    }
  }

  ngOnDestroy() {
    this.radioBtnService.save();
  }

}
