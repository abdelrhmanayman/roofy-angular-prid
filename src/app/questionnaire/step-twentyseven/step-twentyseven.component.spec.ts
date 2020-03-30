import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwentysevenComponent } from './step-twentyseven.component';

describe('StepTwentysevenComponent', () => {
  let component: StepTwentysevenComponent;
  let fixture: ComponentFixture<StepTwentysevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTwentysevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwentysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
