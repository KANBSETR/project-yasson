import { TestBed } from '@angular/core/testing';
import { FirestoreServiceRoles } from './rol.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';


describe('Servicio roles', () => {
  let service: FirestoreServiceRoles;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([
        { id: 1, nombre: 'Rol de ejemplo', descripcion: 'Ejemplo'},
        { id: 1, nombre: 'Rol de ejemplo', descripcion: 'Ejemplo'}
      ]))
    };
    firestoreMock.collection.and.returnValue(collectionStub);
    
    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceRoles,
        { provide: AngularFirestore, useValue: firestoreMock } // Usamos el mock de Firestore
      ],
    });

    service = TestBed.inject(FirestoreServiceRoles);
  });

  it('debería retornar datos de las categorias del getCategorias', (done: DoneFn) => {
    service.getRoles().subscribe((datos) => {
      expect(datos).toEqual([
        { id: 1, nombre: 'Rol de ejemplo', descripcion: 'Ejemplo'},
        { id: 1, nombre: 'Rol de ejemplo', descripcion: 'Ejemplo'}
      ]);
      done();
    });

    // Verificar que se haya llamado a collection() con el nombre correcto
    expect(firestoreMock.collection).toHaveBeenCalledWith('roles');
  });
});
