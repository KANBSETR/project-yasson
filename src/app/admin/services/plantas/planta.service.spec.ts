import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreServicePlantas } from './planta.service';
import { take } from 'rxjs/operators';

describe('Servicio de plantas', () => {
  let service: FirestoreServicePlantas;
  let firestoreMock: any;

  beforeEach(() => {
    // Mock de AngularFirestore para simular Firebase
     firestoreMock = {
      collection: jasmine.createSpy().and.returnValue({
        valueChanges: jasmine.createSpy().and.returnValue(of([{ id: 1, name: 'Planta A' }])),
        doc: jasmine.createSpy().and.returnValue({
          update: jasmine.createSpy().and.returnValue(Promise.resolve()),
          delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
          set: jasmine.createSpy().and.returnValue(Promise.resolve()),
          get: jasmine.createSpy().and.returnValue(of({ exists: true, data: () => ({ count: 0 }) })),
          snapshotChanges: jasmine.createSpy().and.returnValue(of({
            payload: {
              id: '1',
              data: () => ({ name: 'Planta A' })
            }
          }))
        }),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        FirestoreServicePlantas,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(FirestoreServicePlantas);
  });

  // Prueba para obtener todas las plantas
  it('debería obtener una lista de plantas', (done: DoneFn) => {
    service.getPlantas().pipe(take(1)).subscribe(plants => {
      expect(plants).toBeDefined();
      expect(plants.length).toBeGreaterThan(0);
      done();
    });
  });

  // Prueba para agregar una nueva planta
  it('debería agregar una nueva', (done: DoneFn) => {
    const nuevaPlanta = { name: 'Planta B', description: 'Descripción de Planta B' };

    service.addPlanta(nuevaPlanta).pipe(take(1)).subscribe(() => {
      const plantaDoc = firestoreMock.collection('plantas').doc;
      // Verifica que se haya agregado la planta con un ID
      expect(plantaDoc).toHaveBeenCalledWith(jasmine.any(String)); // ID debería ser un string
      expect(plantaDoc().set).toHaveBeenCalledWith(jasmine.objectContaining(nuevaPlanta));
      done();
    });
  });

  it('Deberia devolver solo 1 planta', (done: DoneFn) => {
    service.getPlanta(1).subscribe(result => {
      expect(result).toEqual({ id: '1', name: 'Planta A' });
      done();
    });
  });


  // Prueba para actualizar una planta existente
  it('debería actualizar una planta existente', async () => {
    const id = '1';
    const plantaActualizada = { name: 'Planta Actualizada' };

    await service.updatePlanta(id, plantaActualizada);

    expect(firestoreMock.collection('plantas').doc(id).update).toHaveBeenCalledWith(plantaActualizada);
  });

  // Prueba para eliminar una planta
  it('debería eliminar una planta', (done: DoneFn) => {
    const id = '1';

    service.deletePlanta(id).pipe(take(1)).subscribe(() => {
      expect(firestoreMock.collection('plantas').doc(id).delete).toHaveBeenCalled();
      done();
    });
  });
});

