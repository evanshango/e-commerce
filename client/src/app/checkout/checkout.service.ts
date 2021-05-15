import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IDeliveryMethod} from '../shared/models/deliveryMethod';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IOrderToCreate} from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate): Observable<any>{
    return this.http.post(`${this.baseUrl}orders`, order);
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]>{
    return this.http.get(`${this.baseUrl}orders/delivery-methods`).pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a: IDeliveryMethod, b: IDeliveryMethod) => b.price - a.price);
      })
    );
  }
}
