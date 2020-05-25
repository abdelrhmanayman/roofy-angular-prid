import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPictureComponent } from './left-picture.component';

describe('LeftPictureComponent', () => {
  let component: LeftPictureComponent;
  let fixture: ComponentFixture<LeftPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
