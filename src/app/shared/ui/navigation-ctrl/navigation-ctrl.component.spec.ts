import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCtrlComponent } from './navigation-ctrl.component';

describe('NavigationCtrlComponent', () => {
  let component: NavigationCtrlComponent;
  let fixture: ComponentFixture<NavigationCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
