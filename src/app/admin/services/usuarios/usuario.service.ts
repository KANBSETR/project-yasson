import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/models/IUsuarios';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';




const apiUrl = "http://localhost:3000/usuarios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError\n", error);
      return of(result as T);
    };
  }

  //Agregar Usuario
  addUsuario(usuario: IUsuario): Observable<IUsuario> {
    console.log("Res-api Enviando AddUsuario : ", usuario);
    // Se declara el metodo addUsuario con los parametros usuario de tipo IUsuarios,
    // y retorna un Observable de tipo IUsuario
    // Observable: Objeto con una colección que emite valores o eventos en el tiempo de manera asincrónica.
    return this.http.post<IUsuario>(apiUrl, usuario, httpOptions)
      .pipe(  // Se utiliza el metodo pipe para encadenar operadores que manejan la respuesta y para posibles errores
        // tap no afecta el flujo de datos, sirve para ejecutar efectos secuandarios como el reg de la consola, depuracion, etc.
        tap((usuario: IUsuario) => console.log('added usuario w/:', usuario)),
        // En caso de que ocurra Error
        catchError(this.handleError<IUsuario>('addUsuario'))
      );
  }

  //Listar usuarios
  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  //Obtener un solo usuario
  getUsuario(id: String): Observable<IUsuario> {
    return this.http.get<IUsuario>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched usuario id=${id}')),
        catchError(this.handleError<IUsuario>('getUsuario id=${id}'))
      );
  }

  //Actualizar usuario
  updateUsuario(id: number, usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(apiUrl + "/" + id, usuario, httpOptions)
      .pipe(
        tap(_ => console.log('updated usuario id=${id}')),
        catchError(this.handleError<any>('updateUsuario'))
      );
  }

  //Eliminar usuario
  // deleteUsuario(id: number): Observable<IUsuario> {
  //   return this.http.delete<IUsuario>(apiUrl + "/" + id, httpOptions)
  //     .pipe(
  //       tap(_ => console.log('deleted usuario id=${id}')),
  //       catchError(this.handleError<IUsuario>('deleteUsuario'))
  //     );
  // }

  deleteUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${apiUrl}/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted usuario id=${id}`)),
        catchError(this.handleError<IUsuario>('deleteUsuario'))
      );
  }
}
