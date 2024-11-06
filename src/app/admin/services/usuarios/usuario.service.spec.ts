import { TestBed } from '@angular/core/testing';
import { FirestoreServiceUsuarios } from './usuario.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';


describe('Servicio Usuarios', () => {
  let service: FirestoreServiceUsuarios;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([
        { id: 1, nombres: 'Usuario de ejemplo', apellidos: 'Ejemplo', correo: 'ejemplo@gmail.com', contrasena: '123456', rol: 1},
        { id: 1, nombres: 'Usuario de ejemplo', apellidos: 'Ejemplo', correo: 'ejemplo@gnaf.com', contrasena: '123456', rol: 1}
      ]))
    };
    firestoreMock.collection.and.returnValue(collectionStub);

    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceUsuarios,
        { provide: AngularFirestore, useValue: firestoreMock } // Usamos el mock de Firestore
      ],
    });

    service = TestBed.inject(FirestoreServiceUsuarios);
  });

  it('debería retornar datos de la lista de usuarios', (done: DoneFn) => {
    service.getUsuarios().subscribe((datos) => {
      expect(datos).toEqual([
        { id: 1, nombres: 'Usuario de ejemplo', apellidos: 'Ejemplo', correo: 'ejemplo@gmail.com', contrasena: '123456', rol: 1},
        { id: 1, nombres: 'Usuario de ejemplo', apellidos: 'Ejemplo', correo: 'ejemplo@gnaf.com', contrasena: '123456', rol: 1}
      ]);
      done();
    });
    // Verificar que se haya llamado a collection() con el nombre correcto
    expect(firestoreMock.collection).toHaveBeenCalledWith('usuarios');
  });
});
