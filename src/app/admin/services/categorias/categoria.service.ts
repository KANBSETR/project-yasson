import { Injectable } from '@angular/core';
import { ICategoria } from 'src/app/models/ICategorias';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



const apiUrl = "http://localhost:3000/categorias";
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

  //Agregar una categoria
  addCategoria(categoria: ICategoria): Observable<ICategoria> {
    console.log("Res-api Enviando AddCategoria : ",categoria);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<ICategoria>(apiUrl, categoria, httpOptions)
      .pipe(  // Tubería
         // tap intersecta la respuesta si no hay error
        tap((categoria: ICategoria) => console.log('added product w/:',categoria)),
        // En caso de que ocurra Error
        catchError(this.handleError<ICategoria>('addProduct'))
      );
  }

  //Todas las categorias
  getCategorias(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched categorias')),
        catchError(this.handleError('getCategory', []))
      );
  }

  //Una sola categoria
  getCategoria(id: string): Observable<ICategoria> {
    console.log("getProduct ID:" + id);
    return this.http.get<ICategoria>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched product id=${id}')),
        catchError(this.handleError<ICategoria>('getProduct id=${id}'))
      );
  }

  updateCategoria(id: number, producto: ICategoria): Observable<ICategoria> {
    return this.http.put<ICategoria>(apiUrl + "/" + id, producto, httpOptions)
      .pipe(
        tap(_ => console.log('updated categoria id=${id}')),
        catchError(this.handleError<any>('updateCategoria'))
      );
  }

  deleteCategoria(id: number): Observable<ICategoria> {
    return this.http.delete<ICategoria>(apiUrl + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log('deleted product id=${id}')),
        catchError(this.handleError<ICategoria>('deleteProduct'))
      );
  }

}
