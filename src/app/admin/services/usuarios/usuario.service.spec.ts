import { TestBed } from '@angular/core/testing';

import { FirestoreServiceUsuarios } from './usuario.service';

describe('FirestoreServiceUsuarios', () => {
  let service: FirestoreServiceUsuarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServiceUsuarios);
  });

  it('Deberia estar creado', () => {
    expect(service).toBeTruthy();
  });
});
