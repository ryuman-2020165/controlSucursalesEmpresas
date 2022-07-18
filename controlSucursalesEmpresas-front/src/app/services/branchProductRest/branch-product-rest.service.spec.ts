import { TestBed } from '@angular/core/testing';

import { BranchProductRestService } from './branch-product-rest.service';

describe('BranchProductRestService', () => {
  let service: BranchProductRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchProductRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
