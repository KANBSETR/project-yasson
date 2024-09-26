import { Injectable } from '@angular/core';
import { IPlanta } from 'src/app/models/IPlantas';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



const apiURLCa = "http://localhost:3000/categorias";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError\n",error);
      return of(result as T);
    };
  }

  //Categorias
  getCategory(): Observable<IPlanta[]> {
    return this.http.get<IPlanta[]>(apiURLCa)
      .pipe(
        tap(heroes => console.log('fetched categorias')),
        catchError(this.handleError('getCategory', []))
      );
  }
}
