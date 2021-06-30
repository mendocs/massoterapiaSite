import { TestBed } from '@angular/core/testing';

import { CommomComponentsService } from './commom-components.service';

describe('CommomComponentsService', () => {
  let service: CommomComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommomComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
