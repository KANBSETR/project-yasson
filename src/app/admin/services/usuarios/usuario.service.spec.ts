import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreServiceUsuarios } from './usuario.service';
import { take } from 'rxjs/operators';

describe('Servicio de usuarios', () => {
  let service: FirestoreServiceUsuarios;
  let firestoreMock: any;

  beforeEach(() => {
    // Mock de AngularFirestore para simular Firebase
     firestoreMock = {
      collection: jasmine.createSpy().and.returnValue({
        valueChanges: jasmine.createSpy().and.returnValue(of([{ id: 1, name: 'Usuario A' }])),
        doc: jasmine.createSpy().and.returnValue({
          update: jasmine.createSpy().and.returnValue(Promise.resolve()),
          delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
          set: jasmine.createSpy().and.returnValue(Promise.resolve()),
          get: jasmine.createSpy().and.returnValue(of({ exists: true, data: () => ({ count: 0 }) })),
          snapshotChanges: jasmine.createSpy().and.returnValue(of({
            payload: {
              id: '1',
              data: () => ({ name: 'Usuario A' })
            }
          })),
        }),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceUsuarios,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(FirestoreServiceUsuarios);
  });

  // Prueba para obtener todas los usuarios
  it('debería obtener una lista de usuarios', (done: DoneFn) => {
    service.getUsuarios().pipe(take(1)).subscribe(usuarios => {
      expect(usuarios).toBeDefined();
      expect(usuarios.length).toBeGreaterThan(0);
      done();
    });
  });

  // Prueba para agregar un nuevo usuario
  it('debería agregar un nuevo usuario', (done: DoneFn) => {
    const nuevoUsuario = { name: 'Usuario B'};

    service.addUsuario(nuevoUsuario).pipe(take(1)).subscribe(() => {
      const usuarioDoc = firestoreMock.collection('usuarios').doc;
      // Verifica que se haya agregado la usuario con un ID
      expect(usuarioDoc).toHaveBeenCalledWith(jasmine.any(String)); // ID debería ser un string
      expect(usuarioDoc().set).toHaveBeenCalledWith(jasmine.objectContaining(nuevoUsuario));
      done();
    });
  });

  it('Deberia retornar solo un usuario', (done: DoneFn) => {
    service.getUsuario(1).subscribe(result => {
      expect(result).toEqual({ id: '1', name: 'Usuario A' });
      done();
    });
  });


  // Prueba para actualizar una usuario existente
  it('debería actualizar un usuario existente', async () => {
    const id = '1';
    const usuarioActualizado = { name: 'Usuario actualizado' };

    await service.updateUsuario(id, usuarioActualizado);

    expect(firestoreMock.collection('usuarios').doc(id).update).toHaveBeenCalledWith(usuarioActualizado);
  });

  // Prueba para eliminar una usuario
  it('debería eliminar un usuario', (done: DoneFn) => {
    const id = '1';

    service.deleteUsuario(id).pipe(take(1)).subscribe(() => {
      expect(firestoreMock.collection('usuarios').doc(id).delete).toHaveBeenCalled();
      done();
    });
  });
});


