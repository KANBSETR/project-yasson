import { TestBed } from '@angular/core/testing';
import { FirestoreServicePlantas } from './planta.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of, throwError, from  } from 'rxjs';

describe('Servicio Planta', () => {
  let service: FirestoreServicePlantas;
  let firestoreMock: any;

  beforeEach(() => {
    // Crear el mock de AngularFirestore
    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    
    // Mock de `doc` que devuelve un objeto con `set`, `update`, y `delete`
    const docMock = {
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
      delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
      get: jasmine.createSpy('get').and.returnValue(of({ exists: true, data: () => ({ count: 0 }) })),
    };

    // Mock para `collection`, que devuelve un objeto que contiene `doc`
    firestoreMock.collection.and.callFake(() => ({
      doc: jasmine.createSpy('doc').and.returnValue(docMock),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([{ id: 1, nombre: 'Planta 1' }]))
    }));

    TestBed.configureTestingModule({
      providers: [
        FirestoreServicePlantas,
        { provide: AngularFirestore, useValue: firestoreMock } // Usamos el mock de Firestore
      ],
    });
    firestoreMock.collection.and.callFake(() => ({
      doc: jasmine.createSpy('doc').and.returnValue(docMock),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([{ id: 1, nombrePlanta: 'Planta ejemplo', nombreCientifico: 'Ejemplo científico', categoria: 1, precio: 100, stock: 10, imagen: 'imagen.jpg', descripcion: 'Descripción de la planta' }]))
    }));

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

  it('debería actualizar una planta cuando se llame a updatePlanta', async () => {
    const id = '2';
    const planta = { nombre: 'Planta Actualizada' };

    await service.updatePlanta(id, planta);

    expect(firestoreMock.collection).toHaveBeenCalledWith('plantas');
    const docSpy = firestoreMock.collection().doc;
    expect(docSpy).toHaveBeenCalledWith(id);
    expect(docSpy().update).toHaveBeenCalledWith(planta);
  });

  it('debería eliminar una planta cuando se llame a deletePlanta', (done: DoneFn) => {
    const id = '2';

    service.deletePlanta(id).subscribe(() => {
      expect(firestoreMock.collection).toHaveBeenCalledWith('plantas');
      const docSpy = firestoreMock.collection().doc;
      expect(docSpy).toHaveBeenCalledWith(id);
      expect(docSpy().delete).toHaveBeenCalled();
      done();
    });
  });

  it('debería agregar una nueva planta y actualizar el contador en addPlanta', (done: DoneFn) => {
    const nuevaPlanta = { id: 1, nombrePlanta: 'Planta ejempl 2o', nombreCientifico: 'Ejemplo científico', categoria: 1, precio: 100, stock: 10, imagen: 'imagen.jpg', descripcion: 'Descripción de la planta' };

    service.addPlanta(nuevaPlanta).subscribe(() => {
      expect(firestoreMock.collection).toHaveBeenCalledWith('plantas');
      expect(firestoreMock.collection).toHaveBeenCalledWith('counters');
      
      const counterDocSpy = firestoreMock.collection('counters').doc;
      expect(counterDocSpy).toHaveBeenCalledWith('plantaCounter');
      
      const plantaDocSpy = firestoreMock.collection('plantas').doc;
      expect(plantaDocSpy).toHaveBeenCalledWith('1'); // Supone que el contador inicial es 0, así que el nuevo ID es '1'
      expect(plantaDocSpy().set).toHaveBeenCalledWith({ ...nuevaPlanta, id: 1 });
      
      // Verifica que se actualice el contador
      expect(counterDocSpy().update).toHaveBeenCalledWith({ count: 1 });
      done();
    });
  });
});
