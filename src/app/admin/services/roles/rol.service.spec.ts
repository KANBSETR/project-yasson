import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreServiceRoles } from './rol.service';
import { take } from 'rxjs/operators';

describe('Servicio de roles', () => {
  let service: FirestoreServiceRoles;
  let firestoreMock: any;

  beforeEach(() => {
    // Mock de AngularFirestore para simular Firebase
     firestoreMock = {
      collection: jasmine.createSpy().and.returnValue({
        valueChanges: jasmine.createSpy().and.returnValue(of([{ id: 1, name: 'Rol A' }])),
        doc: jasmine.createSpy().and.returnValue({
          update: jasmine.createSpy().and.returnValue(Promise.resolve()),
          delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
          set: jasmine.createSpy().and.returnValue(Promise.resolve()),
          get: jasmine.createSpy().and.returnValue(of({ exists: true, data: () => ({ count: 0 }) })),
          snapshotChanges: jasmine.createSpy().and.returnValue(of({
            payload: {
              id: '1',
              data: () => ({ name: 'Rol A' })
            }
          })),
        }),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceRoles,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(FirestoreServiceRoles);
  });

  // Prueba para obtener todas los roles
  it('debería obtener una lista de roles', (done: DoneFn) => {
    service.getRoles().pipe(take(1)).subscribe(roles => {
      expect(roles).toBeDefined();
      expect(roles.length).toBeGreaterThan(0);
      done();
    });
  });

  // Prueba para agregar un nuevo rol
  it('debería agregar un rol', (done: DoneFn) => {
    const nuevoRol = { name: 'Rol B', description: 'Descripción de rol B' };

    service.addRol(nuevoRol).pipe(take(1)).subscribe(() => {
      const rolesDoc = firestoreMock.collection('roles').doc;
      expect(rolesDoc).toHaveBeenCalledWith(jasmine.any(String)); // ID debería ser un string
      expect(rolesDoc().set).toHaveBeenCalledWith(jasmine.objectContaining(nuevoRol));
      done();
    });
  });

  it('Deberia retornar solo un rol', (done: DoneFn) => {
    service.getRol(1).subscribe(result => {
      expect(result).toEqual({ id: '1', name: 'Rol A' });
      done();
    });
  });


 // Prueba para actualizar un rol existente
  it('debería actualizar un rol existente', async () => {
    const id = '1';
    const rolActualizado = { name: 'Rol Actualizado'};

    await service.updateRol(id, rolActualizado);

    expect(firestoreMock.collection('roles').doc(id).update).toHaveBeenCalledWith(rolActualizado);
  });

  // Prueba para eliminar un rol
  it('debería eliminar un Rol', (done: DoneFn) => {
    const id = '1';
    service.deleteRol(id).pipe(take(1)).subscribe(() => {
      expect(firestoreMock.collection('roles').doc(id).delete).toHaveBeenCalled();
      done();
    });
  });
});