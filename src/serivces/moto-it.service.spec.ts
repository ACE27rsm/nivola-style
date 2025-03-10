import { TestBed } from '@angular/core/testing';

import { MotoItService } from './moto-it.service';

describe('MotoItService', () => {
  let service: MotoItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotoItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
