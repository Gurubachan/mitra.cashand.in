import { TestBed } from '@angular/core/testing';

import { CostumehttpService } from './costumehttp.service';

describe('CostumehttpService', () => {
  let service: CostumehttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumehttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
