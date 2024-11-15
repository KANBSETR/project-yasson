import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private apiUrl = 'http://localhost:9098/create-order';
  constructor(private http: HttpClient) { }

  createOrder(amountValue: string): Observable<any> {
    const body = { amountValue };
    return this.http.post<any>(this.apiUrl, body);
  }
}
