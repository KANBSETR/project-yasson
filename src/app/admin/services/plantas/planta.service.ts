import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServicePlantas {

  constructor(private firestore: AngularFirestore) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Agregar una planta
  addPlanta(planta: any): Observable<void> {
    const counterDoc = this.firestore.collection('counters').doc('plantaCounter'); // Contador para el id de la planta
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
        planta.id = newCounter; // Asigna el id del contador a la planta
        // Crea un nuevo documento en la colección 'plantas' con el nuevo ID
        return from(this.firestore.collection('plantas').doc(newCounter.toString()).set(planta)).pipe(
          // Actualiza el documento del contador con el nuevo valor del contador
          tap(() => counterDoc.update({ count: newCounter })),
          catchError(this.handleError<void>('addPlanta'))
        );
      }),
      catchError(this.handleError<void>('addPlanta'))
    );
  }

  // Listar plantas
  getPlantas(): Observable<any[]> {
    // Obtiene todos los documentos de la colección plantas
    return this.firestore.collection('plantas').valueChanges()
      .pipe(
        tap(_ => console.log('plantas listadas')),
        catchError(this.handleError<any[]>('getPlantas', [])) // Devuelve array vacío si hay error
      );
  }

  // Obtener una sola planta
  getPlanta(id: any): Observable<any> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    // Obtiene el documento con el ID especificado de la colección plantas
    return this.firestore.collection('plantas').doc(idStr).snapshotChanges()
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
        tap(_ => console.log(`planta encontrada id=${idStr}`)),
        catchError(this.handleError<any>(`getPlanta id=${idStr}`)) // Devuelve null en caso de error
      );
  }

  // Actualizar una planta
  updatePlanta(id: any, planta: any): Promise<void> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    return this.firestore.collection('plantas').doc(idStr).update(planta)
      .then(() => console.log(`Planta actualizada id=${idStr}`))
      .catch(error => {
        console.error(`Error al actualizar la planta id=${idStr}`, error);
        throw error;
      });
  }

  // Eliminar una planta
  deletePlanta(id: string): Observable<void> {
    // Elimina el documento con el ID especificado de la colección plantas
    return from(this.firestore.collection('plantas').doc(id.toString()).delete())
      .pipe(
        tap(_ => console.log(`planta eliminada id=${id}`)),
        catchError(this.handleError<void>('deletePlanta'))
      );
  }
}