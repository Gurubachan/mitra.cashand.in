import { TestBed } from '@angular/core/testing';

import { EncryptdecryptService } from './encryptdecrypt.service';

describe('EncryptdecryptService', () => {
  let service: EncryptdecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptdecryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
