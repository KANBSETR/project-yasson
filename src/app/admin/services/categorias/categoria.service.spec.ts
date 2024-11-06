import { TestBed } from '@angular/core/testing';
import { FirestoreServiceCategoria } from './categoria.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('Servicio Categoria', () => {
  let service: FirestoreServiceCategoria;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([
        { id: 1, nombre: 'Categoria de ejemplo', descripcion: 'Ejemplo'},
        { id: 1, nombre: 'Categoria de ejemplo', descripcion: 'Ejemplo'}
      ]))
    };
    firestoreMock.collection.and.returnValue(collectionStub);

    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceCategoria,
        { provide: AngularFirestore, useValue: firestoreMock } // Usamos el mock de Firestore
      ],
    });

    service = TestBed.inject(FirestoreServiceCategoria);
  });

  it('debería retornar datos de las categorias del getCategorias', (done: DoneFn) => {
    service.getCategorias().subscribe((datos) => {
      expect(datos).toEqual([
        { id: 1, nombre: 'Categoria de ejemplo', descripcion: 'Ejemplo'},
        { id: 1, nombre: 'Categoria de ejemplo', descripcion: 'Ejemplo'}
      ]);
      done();
    });

    // Verificar que se haya llamado a collection() con el nombre correcto
    expect(firestoreMock.collection).toHaveBeenCalledWith('categorias');
  });
});
