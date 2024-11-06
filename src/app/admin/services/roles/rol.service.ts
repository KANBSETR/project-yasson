import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceRoles {

  constructor(private firestore: AngularFirestore) { }

  private handleError<T>(operation = 'operation', result?: T) {
    // Retorna una función que toma un error y devuelve un Observable
    return (error: any): Observable<T> => { // Un observable es un obj que representa una secuencia de event o valores futuros, este es asincornico
      console.error(`${operation} failed: ${error.message}`);
      // Devuelve un Observable con un valor predeterminado para que la aplicación continúe funcionando
      return of(result as T);
    };
  }



  // Sirve para crear un documento en la colección especifica de la bd en roles
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection('roles');
    return collection.doc(id).set(data);
  }

  // Agregar rol
  addRol(rol: any): Observable<void> {
    const counterDoc = this.firestore.collection('counters').doc('rolCounter'); // Contador para el id del rol
    return from(counterDoc.get()).pipe(
      switchMap(doc => {
        if (!doc.exists) {
          // Si el documento no existe, inicializa el contador
          return from(counterDoc.set({ count: 0 })).pipe(
            switchMap(() => of({ count: 0 }))
          );
        } else {
          return of(doc.data() as { count: number });
        }
      }),
      switchMap(data => {
        const currentCounter = data.count;
        const newCounter = currentCounter + 1;
        rol.id = newCounter; // Asigna el id del contador al rol
        // Crea un nuevo documento en la colección 'roles' con el nuevo ID
        return from(this.firestore.collection('roles').doc(newCounter.toString()).set(rol)).pipe(
          // Actualiza el documento del contador con el nuevo valor del contador
          tap(() => counterDoc.update({ count: newCounter })),
          catchError(this.handleError<void>('addRol'))
        );
      }),
      catchError(this.handleError<void>('addRol'))
    );
  }



  // Listar roles
  getRoles(): Observable<any[]> {
    // Obtiene todos los documentos de la colección roles
    return this.firestore.collection('roles').valueChanges()
      .pipe(
        tap(_ => console.log('roles listados')),
        catchError(this.handleError<any[]>('getRoles', [])) //Devuelve array vacio si hay error
      );
  }


  // Obtener un solo rol
  getRol(id: any): Observable<any> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    // Obtiene el documento con el ID especificado de la colección roles
    return this.firestore.collection('roles').doc(idStr).snapshotChanges()
      .pipe(
        // Transforma los datos del documento en un objeto con el ID y los datos del documento con map
        map(action => { // Esto sirve para el manejo de inf en el front, id directo, data en un objeto, etc
          const data = action.payload.data();
          if (data) {
            const docId = action.payload.id;
            return { id: docId, ...data };
          } else {
            return null;
          }
        }),
        tap(_ => console.log(`rol encontrado id=${idStr}`)),
        catchError(this.handleError<any>(`getRol id=${idStr}`)) // Devuelve null en caso de error
      );
  }


  // Actualizar un rol
  updateRol(id: any, rol: any): Promise<void> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    return this.firestore.collection('roles').doc(idStr).update(rol)
      .then(() => console.log(`Rol actualizado id=${idStr}`))
      .catch(error => {
        console.error(`Error al actualizar el rol id=${idStr}`, error);
        throw error;
      });
  }

  // Eliminar rol
  deleteRol(id: string): Observable<void> {
    // Elimina el documento con el ID especificado de la colección roles
    return from(this.firestore.collection('roles').doc(id.toString()).delete())
      .pipe(
        tap(_ => console.log(`rol eliminado id=${id}`)),
        catchError(this.handleError<void>('deleteRol'))
      );
  }
}