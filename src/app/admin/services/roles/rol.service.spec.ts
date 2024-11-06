import { TestBed } from '@angular/core/testing';

import { FirestoreServiceRoles } from './rol.service';

describe('FirestoreServiceRoles', () => {
  let service: FirestoreServiceRoles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServiceRoles);
  });

  it('Deberia estar creado', () => {
    expect(service).toBeTruthy();
  });
});
