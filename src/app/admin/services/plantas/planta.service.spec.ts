import { TestBed } from '@angular/core/testing';

import { FirestoreServicePlantas } from './planta.service';

describe('PlantaService', () => {
  let service: FirestoreServicePlantas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServicePlantas);
  });

  it('Deberia estar creado', () => {
    expect(service).toBeTruthy();
  });
});
