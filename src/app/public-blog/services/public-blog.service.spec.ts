import { TestBed } from '@angular/core/testing';

import { PublicBlogService } from './public-blog.service';

describe('PublicBlogService', () => {
  let service: PublicBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
