import { TestBed } from '@angular/core/testing';

import { HelyService } from './hely.service';

describe('HelyekService', () => {
  let service: HelyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
