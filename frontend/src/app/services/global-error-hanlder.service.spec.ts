import { TestBed } from '@angular/core/testing';

import { GlobalErrorHanlderService } from './global-error-hanlder.service';

describe('GlobalErrorHanlderService', () => {
  let service: GlobalErrorHanlderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHanlderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
