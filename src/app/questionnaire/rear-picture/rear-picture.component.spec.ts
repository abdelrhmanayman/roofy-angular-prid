import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RearPictureComponent } from './rear-picture.component';

describe('RearPictureComponent', () => {
  let component: RearPictureComponent;
  let fixture: ComponentFixture<RearPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RearPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RearPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
