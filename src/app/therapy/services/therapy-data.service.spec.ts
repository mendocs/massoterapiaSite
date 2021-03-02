import { TestBed } from '@angular/core/testing';

import { TherapyDataService } from './therapy-data.service';

describe('TherapyDataService', () => {
  let service: TherapyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
