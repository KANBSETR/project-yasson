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
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection('usuarios');
    return collection.doc(id).set(data);
  }

  addUsuario(usuario: any): Observable<void> {
    const counterDoc = this.firestore.collection('counters').doc('usuarioCounter');
    return from(counterDoc.get()).pipe(
      switchMap(doc => {
        if (!doc.exists) {
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
        usuario.id = newCounter;
        return from(this.firestore.collection('usuarios').doc(newCounter.toString()).set(usuario)).pipe(
          tap(() => counterDoc.update({ count: newCounter })),
          catchError(this.handleError<void>('addUsuario'))
        );
      }),
      catchError(this.handleError<void>('addUsuario'))
    );
  }

  getUsuarios(): Observable<any[]> {
    return this.firestore.collection('usuarios').valueChanges()
      .pipe(
        tap(_ => console.log('usuarios listados')),
        catchError(this.handleError<any[]>('getUsuarios', []))
      );
  }

  getUsuario(id: any): Observable<any> {
    const idStr = String(id);
    return this.firestore.collection('usuarios').doc(idStr).snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.data();
          if (data) {
            const docId = action.payload.id;
            return { id: docId, ...data };
          } else {
            return null;
          }
        }),
        tap(_ => console.log(`usuario encontrado id=${idStr}`)),
        catchError(this.handleError<any>(`getUsuario id=${idStr}`))
      );
  }

  updateUsuario(id: any, usuario: any): Promise<void> {
    const idStr = String(id);
    return this.firestore.collection('usuarios').doc(idStr).update(usuario)
      .then(() => console.log(`Usuario actualizado id=${idStr}`))
      .catch(error => {
        console.error(`Error al actualizar el usuario id=${idStr}`, error);
        throw error;
      });
  }

  deleteUsuario(id: string): Observable<void> {
    return from(this.firestore.collection('usuarios').doc(id.toString()).delete())
      .pipe(
        tap(_ => console.log(`usuario eliminado id=${id}`)),
        catchError(this.handleError<void>('deleteUsuario'))
      );
  }
}