import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceUsuarios {

  constructor(private firestore: AngularFirestore) { }

  private handleError<T>(operation = 'operation', result?: T) {
    // Retorna una función que toma un error y devuelve un Observable
    return (error: any): Observable<T> => { // Un observable es un obj que representa una secuencia de event o valores futuros, este es asincornico
      console.error(`${operation} failed: ${error.message}`);
      // Devuelve un Observable con un valor predeterminado para que la aplicación continúe funcionando
      return of(result as T);
    };
  }


  // Crear un documento en la colección especifica de la bd en usuarios
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection('usuarios');
    return collection.doc(id).set(data);
  }

  // Agregar usuario
  addUsuario(usuario: any): Observable<void> {
    const counterDoc = this.firestore.collection('counters').doc('usuarioCounter'); // Contador para el id del usuario
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
        usuario.id = newCounter; // Asigna el id del contador al usuario
        // Crea un nuevo documento en la colección 'usuarios' con el nuevo ID
        return from(this.firestore.collection('usuarios').doc(newCounter.toString()).set(usuario)).pipe(
          // Actualiza el documento del contador con el nuevo valor del contador
          tap(() => counterDoc.update({ count: newCounter })),
          catchError(this.handleError<void>('addUsuario'))
        );
      }),
      catchError(this.handleError<void>('addUsuario'))
    );
  }

  // Listar usuarios
  getUsuarios(): Observable<any[]> {
    // Obtiene todos los documentos de la colección usuarios
    return this.firestore.collection('usuarios').valueChanges()
      .pipe(
        tap(_ => console.log('usuarios listados')),
        catchError(this.handleError<any[]>('getUsuarios', [])) // Devuelve array vacío si hay error
      );
  }

  // Obtener un solo usuario
  getUsuario(id: any): Observable<any> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    // Obtiene el documento con el ID especificado de la colección usuarios
    return this.firestore.collection('usuarios').doc(idStr).snapshotChanges()
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
        tap(_ => console.log(`usuario encontrado id=${idStr}`)),
        catchError(this.handleError<any>(`getUsuario id=${idStr}`)) // Devuelve null en caso de error
      );
  }

  // Actualizar un usuario
  updateUsuario(id: any, usuario: any): Promise<void> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    return this.firestore.collection('usuarios').doc(idStr).update(usuario)
      .then(() => console.log(`Usuario actualizado id=${idStr}`))
      .catch(error => {
        console.error(`Error al actualizar el usuario id=${idStr}`, error);
        throw error;
      });
  }

  // Eliminar usuario
  deleteUsuario(id: string): Observable<void> {
    // Elimina el documento con el ID especificado de la colección usuarios
    return from(this.firestore.collection('usuarios').doc(id.toString()).delete())
      .pipe(
        tap(_ => console.log(`usuario eliminado id=${id}`)),
        catchError(this.handleError<void>('deleteUsuario'))
      );
  }
}