import { TestBed } from '@angular/core/testing';

import { GlobalUsersService } from './global-users.service';

describe('GlobalUsersService', () => {
  let service: GlobalUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
