import { TestBed } from '@angular/core/testing';

import { FoglalasService } from './foglalas.service';

describe('FoglalasService', () => {
  let service: FoglalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoglalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
