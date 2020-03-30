import { TestBed } from '@angular/core/testing';

import { RadioBtnService } from './radio-btn.service';

describe('RadioBtnService', () => {
  let service: RadioBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
