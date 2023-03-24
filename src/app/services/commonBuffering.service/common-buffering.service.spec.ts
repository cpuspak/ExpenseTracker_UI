import { TestBed } from '@angular/core/testing';

import { CommonBufferingService } from './common-buffering.service';

describe('CommonBufferingService', () => {
  let service: CommonBufferingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonBufferingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
