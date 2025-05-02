import { TestBed } from '@angular/core/testing';

import { Z407Service } from './z407.service';

describe('Z407Service', () => {
  let service: Z407Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Z407Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
