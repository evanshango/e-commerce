import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IOrder} from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getOrdersForUser(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}orders`);
  }

  getOrderDetailed(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.baseUrl}orders/${id}`);
  }
}
