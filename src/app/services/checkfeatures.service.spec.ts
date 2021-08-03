import { TestBed } from '@angular/core/testing';

import { CheckfeaturesService } from './checkfeatures.service';

describe('CheckfeaturesService', () => {
  let service: CheckfeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckfeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
