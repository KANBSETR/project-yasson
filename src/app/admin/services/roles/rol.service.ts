import { Injectable } from '@angular/core';
import { IRol } from 'src/app/models/IRoles';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiURLRol = "http://localhost:3000/roles";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private htpp: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError\n",error);
      return of(result as T);
    };
  }

  addRol(rol: IRol): Observable<IRol> {
    console.log("Res-api Enviando AddRol : ",rol);
    return this.htpp.post<IRol>(apiURLRol, rol, httpOptions)
      .pipe(
        tap((rol: IRol) => console.log('added rol w/:',rol)),
        catchError(this.handleError<IRol>('addRol'))
      );
  }

  //Listar roles
  getRoles(): Observable<IRol[]> {
    return this.htpp.get<IRol[]>(apiURLRol)
      .pipe(
        tap(heroes => console.log('fetched roles')),
        catchError(this.handleError('getRoles', []))
      );
  }

  //Un solo rol
  getRol(id: String): Observable<IRol> {
    return this.htpp.get<IRol>(apiURLRol + "/" + id)
      .pipe(
        tap(_ => console.log('fetched rol id=${id}')),
        catchError(this.handleError<IRol>('getRol id=${id}'))
      );
  }

  //Actualizar rol
  updateRol(id: number, rol: IRol): Observable<IRol> {
    return this.htpp.put<IRol>(apiURLRol + "/" + id, rol, httpOptions)
      .pipe(
        tap(_ => console.log('updated rol id=${id}')),
        catchError(this.handleError<any>('updateRol'))
      );
  }

  //Eliminar rol
  deleteRol(id: number): Observable<IRol> {
    return this.htpp.delete<IRol>(apiURLRol + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted rol id=${id}')),
        catchError(this.handleError<any>('deleteRol'))
      );
  }
}
