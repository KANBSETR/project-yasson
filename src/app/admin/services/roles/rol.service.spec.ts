import { TestBed } from '@angular/core/testing';

import { FirestoreServiceRoles } from './rol.service';

describe('FirestoreServiceRoles', () => {
  let service: FirestoreServiceRoles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServiceRoles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
