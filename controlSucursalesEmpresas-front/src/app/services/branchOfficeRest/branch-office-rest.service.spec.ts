import { TestBed } from '@angular/core/testing';

import { BranchOfficeRestService } from './branch-office-rest.service';

describe('BranchOfficeRestService', () => {
  let service: BranchOfficeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchOfficeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
