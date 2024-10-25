import { TestBed } from '@angular/core/testing';

import { FirestoreServiceUsuarios } from './usuario.service';

describe('FirestoreServiceUsuarios', () => {
  let service: FirestoreServiceUsuarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServiceUsuarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
