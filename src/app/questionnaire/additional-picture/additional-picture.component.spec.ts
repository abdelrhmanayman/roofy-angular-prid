import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalPictureComponent } from './additional-picture.component';

describe('AdditionalPictureComponent', () => {
  let component: AdditionalPictureComponent;
  let fixture: ComponentFixture<AdditionalPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
