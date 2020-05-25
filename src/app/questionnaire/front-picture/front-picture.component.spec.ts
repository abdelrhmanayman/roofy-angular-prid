import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPictureComponent } from './front-picture.component';

describe('FrontPictureComponent', () => {
  let component: FrontPictureComponent;
  let fixture: ComponentFixture<FrontPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
