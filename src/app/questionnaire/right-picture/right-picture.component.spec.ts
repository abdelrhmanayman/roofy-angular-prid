import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPictureComponent } from './right-picture.component';

describe('RightPictureComponent', () => {
  let component: RightPictureComponent;
  let fixture: ComponentFixture<RightPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
