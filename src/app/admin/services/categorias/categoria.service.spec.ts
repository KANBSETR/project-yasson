import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreServiceCategoria } from './categoria.service';
import { take } from 'rxjs/operators';

describe('Servicio de categorias', () => {
  let service: FirestoreServiceCategoria;
  let firestoreMock: any;

  beforeEach(() => {
    // Mock de AngularFirestore para simular Firebase
     firestoreMock = {
      collection: jasmine.createSpy().and.returnValue({
        valueChanges: jasmine.createSpy().and.returnValue(of([{ id: 1, name: 'Categoria A' }])),
        doc: jasmine.createSpy().and.returnValue({
          update: jasmine.createSpy().and.returnValue(Promise.resolve()),
          delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
          set: jasmine.createSpy().and.returnValue(Promise.resolve()),
          get: jasmine.createSpy().and.returnValue(of({ exists: true, data: () => ({ count: 0 }) })),
          snapshotChanges: jasmine.createSpy().and.returnValue(of({
            payload: {
              id: '1',
              data: () => ({ name: 'Categoria A' })
            }
          })),
        }),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceCategoria,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(FirestoreServiceCategoria);
  });

  // Prueba para obtener todas las categorias
  it('debería obtener una lista de categorias', (done: DoneFn) => {
    service.getCategorias().pipe(take(1)).subscribe(categorias => {
      expect(categorias).toBeDefined();
      expect(categorias.length).toBeGreaterThan(0);
      done();
    });
  });

  // Prueba para agregar una nueva categoria
  it('debería agregar una nueva categoria', (done: DoneFn) => {
    const nuevaCategoria = { name: 'Categoria B', description: 'Descripción de Categoria B' };

    service.addCategoria(nuevaCategoria).pipe(take(1)).subscribe(() => {
      const categoriaDoc = firestoreMock.collection('categorias').doc;
      // Verifica que se haya agregado la categoria con un ID
      expect(categoriaDoc).toHaveBeenCalledWith(jasmine.any(String)); // ID debería ser un string
      expect(categoriaDoc().set).toHaveBeenCalledWith(jasmine.objectContaining(nuevaCategoria));
      done();
    });
  });

  it('Deberia retornar solo una categoría', (done: DoneFn) => {
    service.getCategoria(1).subscribe(result => {
      expect(result).toEqual({ id: '1', name: 'Categoria A' });
      done();
    });
  });


  // Prueba para actualizar una categoria existente
  it('debería actualizar una categoria existente', async () => {
    const id = '1';
    const categoriaActualizada = { name: 'categoria Actualizada' };

    await service.updateCategoria(id, categoriaActualizada);

    expect(firestoreMock.collection('categorias').doc(id).update).toHaveBeenCalledWith(categoriaActualizada);
  });

  // Prueba para eliminar una categoria
  it('debería eliminar una categoria', (done: DoneFn) => {
    const id = '1';

    service.deleteCategoria(id).pipe(take(1)).subscribe(() => {
      expect(firestoreMock.collection('categorias').doc(id).delete).toHaveBeenCalled();
      done();
    });
  });
});


