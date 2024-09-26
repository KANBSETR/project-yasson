import { Injectable } from '@angular/core';
import { IPlanta } from 'src/app/models/IPlantas';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://localhost:3000/plantas";
const apiURLCa = "http://localhost:3000/categorias";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError\n",error);
      return of(result as T);
    };
  }

  addProduct(planta: IPlanta): Observable<IPlanta> {
    console.log("Res-api Enviando AddPlanta : ",planta);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<IPlanta>(apiUrl, planta, httpOptions)
      .pipe(  // Tubería
         // tap intersecta la respuesta si no hay error
        tap((planta: IPlanta) => console.log('added product w/:',planta)),
        // En caso de que ocurra Error
        catchError(this.handleError<IPlanta>('addProduct'))
      );
  }
  getPlanta(): Observable<IPlanta[]> {
    console.log("getPlanta ()");
    return this.http.get<IPlanta[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched plantas')),
        catchError(this.handleError('getPlanta', []))
      );
  }
}
