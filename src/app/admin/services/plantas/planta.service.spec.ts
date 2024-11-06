import { TestBed } from '@angular/core/testing';
import { FirestoreServicePlantas } from './planta.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('Servicio Planta', () => {
  let service: FirestoreServicePlantas;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([
        { id: 1, nombrePlanta: 'Planta ejemplo', nombreCientifico: 'Ejemplo científico', categoria: 1, precio: 100, stock: 10, imagen: 'imagen.jpg', descripcion: 'Descripción de la planta' },
        { id: 1, nombrePlanta: 'Planta ejemplo', nombreCientifico: 'Ejemplo científico', categoria: 1, precio: 100, stock: 10, imagen: 'imagen.jpg', descripcion: 'Descripción de la planta' }
      ]))
    };
    firestoreMock.collection.and.returnValue(collectionStub);

    TestBed.configureTestingModule({
      providers: [
        FirestoreServicePlantas,
        { provide: AngularFirestore, useValue: firestoreMock } // Usamos el mock de Firestore
      ],
    });

    service = TestBed.inject(FirestoreServicePlantas);
  });

  it('debería retornar datos de plantas cuando se llame a getPlantas', (done: DoneFn) => {
    service.getPlantas().subscribe((datos) => {
      expect(datos).toEqual([
        { id: 1, nombrePlanta: 'Planta ejemplo', nombreCientifico: 'Ejemplo científico', categoria: 1, precio: 100, stock: 10, imagen: 'imagen.jpg', descripcion: 'Descripción de la planta' },
        { id: 1, nombrePlanta: 'Planta ejemplo', nombreCientifico: 'Ejemplo científico', categoria: 1, precio: 100, stock: 10, imagen: 'imagen.jpg', descripcion: 'Descripción de la planta' }
      ]); // Verificamos que los datos retornados sean los esperados
      done();
    });

    // Verificar que se haya llamado a collection() con el nombre correcto
    expect(firestoreMock.collection).toHaveBeenCalledWith('plantas');
  });
});
