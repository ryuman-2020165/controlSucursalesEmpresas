import { TestBed } from '@angular/core/testing';

import { CompanyRestService } from './company-rest.service';

describe('CompanyRestService', () => {
  let service: CompanyRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
