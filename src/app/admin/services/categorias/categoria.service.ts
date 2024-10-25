import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceCategoria {

  constructor(private firestore: AngularFirestore) { }

  private handleError<T>(operation = 'operation', result?: T) {
    // Retorna una función que toma un error y devuelve un Observable
    return (error: any): Observable<T> => { // Un observable es un obj que representa una secuencia de event o valores futuros, este es asincornico
      console.error(`${operation} failed: ${error.message}`);
      // Devuelve un Observable con un valor predeterminado para que la aplicación continúe funcionando
      return of(result as T);
    };
  }

  // Agregar una categoría
  addCategoria(categoria: any): Observable<void> {
    const counterDoc = this.firestore.collection('counters').doc('categoriaCounter'); // Contador para el id de la categoría
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
        categoria.id = newCounter; // Asigna el id del contador a la categoría
        // Crea un nuevo documento en la colección 'categorias' con el nuevo ID
        return from(this.firestore.collection('categorias').doc(newCounter.toString()).set(categoria)).pipe(
          // Actualiza el documento del contador con el nuevo valor del contador
          tap(() => counterDoc.update({ count: newCounter })),
          catchError(this.handleError<void>('addCategoria'))
        );
      }),
      catchError(this.handleError<void>('addCategoria'))
    );
  }

  // Listar categorías
  getCategorias(): Observable<any[]> {
    // Obtiene todos los documentos de la colección categorias
    return this.firestore.collection('categorias').valueChanges()
      .pipe(
        tap(_ => console.log('categorias listadas')),
        catchError(this.handleError<any[]>('getCategorias', [])) // Devuelve array vacío si hay error
      );
  }

  // Obtener una sola categoría
  getCategoria(id: any): Observable<any> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    // Obtiene el documento con el ID especificado de la colección categorias
    return this.firestore.collection('categorias').doc(idStr).snapshotChanges()
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
        tap(_ => console.log(`categoria encontrada id=${idStr}`)),
        catchError(this.handleError<any>(`getCategoria id=${idStr}`)) // Devuelve null en caso de error
      );
  }

  // Actualizar una categoría
  updateCategoria(id: any, categoria: any): Promise<void> {
    // Convierte el ID a una cadena
    const idStr = String(id);

    return this.firestore.collection('categorias').doc(idStr).update(categoria)
      .then(() => console.log(`Categoría actualizada id=${idStr}`))
      .catch(error => {
        console.error(`Error al actualizar la categoría id=${idStr}`, error);
        throw error;
      });
  }

  // Eliminar una categoría
  deleteCategoria(id: string): Observable<void> {
    // Elimina el documento con el ID especificado de la colección categorias
    return from(this.firestore.collection('categorias').doc(id.toString()).delete())
      .pipe(
        tap(_ => console.log(`categoria eliminada id=${id}`)),
        catchError(this.handleError<void>('deleteCategoria'))
      );
  }
}