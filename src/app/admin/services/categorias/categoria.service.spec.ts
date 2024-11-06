import { TestBed } from '@angular/core/testing';

import { FirestoreServiceCategoria } from './categoria.service';

describe('CategoriaService', () => {
  let service: FirestoreServiceCategoria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServiceCategoria);
  });

  it('Deberia estar creado', () => {
    expect(service).toBeTruthy();
  });
});
