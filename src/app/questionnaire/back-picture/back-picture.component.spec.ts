import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPictureComponent } from './back-picture.component';

describe('BackPictureComponent', () => {
  let component: BackPictureComponent;
  let fixture: ComponentFixture<BackPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
