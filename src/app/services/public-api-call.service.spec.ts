import { TestBed } from '@angular/core/testing';

import { PublicApiCallService } from './public-api-call.service';

describe('PublicApiCallService', () => {
  let service: PublicApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
