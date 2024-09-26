import { Injectable } from '@angular/core';
import { IPlanta } from 'src/app/models/IPlantas';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://localhost:3000/plantas";
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

  addPlanta(producto: IPlanta): Observable<IPlanta> {
    console.log("Res-api Enviando AddProducto : ", producto);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<IPlanta>(apiUrl, producto, httpOptions)
      .pipe(  // Tubería
        // tap intersecta la respuesta si no hay error
        tap((producto: IPlanta) => console.log('added product w/:', producto)),
        // En caso de que ocurra Error
        catchError(this.handleError<IPlanta>('addProduct'))
      );
  }
  getPlantas(): Observable<IPlanta[]> {
    console.log("getPlanta ()");
    return this.http.get<IPlanta[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched plantas')),
        catchError(this.handleError('getPlanta', []))
      );
  }

  //Una sola planta
  getPlanta(id: String): Observable<IPlanta> {
    console.log("getProduct ID:" + id);
    return this.http.get<IPlanta>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched product id=${id}')),
        catchError(this.handleError<IPlanta>('getProduct id=${id}'))
      );
  }

  updatePlanta(id: number, producto: IPlanta): Observable<IPlanta> {
    return this.http.put<IPlanta>(apiUrl + "/" + id, producto, httpOptions)
      .pipe(
        tap(_ => console.log('updated planta id=${id}')),
        catchError(this.handleError<any>('updatePlanta'))
      );
  }

  deletePlanta(id: number): Observable<IPlanta> {
    return this.http.delete<IPlanta>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted product id=${id}')),
        catchError(this.handleError<IPlanta>('deleteProduct'))
      );
  }

}
