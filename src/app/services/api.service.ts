import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

//Vean si pueden hacerlo porque no me salio, pero es para hacer una solicitud a la API 
// https://perenual.com/api/ solamente y que dependiendo del evento o la vista este ocupe diferentes rutas, tipo species/detail o la lista de especies
// Nose si se entiende pero si quieren prueben, quiza seria mejor y bien hecho el service


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://perenual.com/api/species/details'; // Base URL de la API, se puede cambiar por otra pero verifiquen la ruta
  private apiKey = 'sk-MVpT66da2dfb3a3d96740'; // Clave de acceso

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<any> {
    const params = new HttpParams().set('key', this.apiKey);
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { params });
  }

  getSpeciesList(page: number): Observable<any> {
    const limit = 5; // Límite de plantas por página (No las carguen todas porque son como 1100 y casi me explota el pc)
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('limit', limit.toString());
    const url = 'https://perenual.com/api/species-list'; // URL de la lista de especies, la pagina tiene diferentes url
    return this.http.get<any>(url, { params });
  }
}