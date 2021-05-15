import { Component, OnInit } from '@angular/core';
import {IOrder} from '../shared/models/order';
import {OrdersService} from './orders.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];

  constructor(private orderService: OrdersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void{
    this.orderService.getOrdersForUser().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      this.toastr.error('An error occurred while fetching your orders');
      console.log(error);
    });
  }

}
