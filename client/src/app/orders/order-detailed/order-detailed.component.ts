import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbService} from 'xng-breadcrumb';
import {OrdersService} from '../orders.service';
import {IOrder} from '../../shared/models/order';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, private ordersService: OrdersService,
              private toastr: ToastrService) {
    this.breadcrumbService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    this.ordersService.getOrderDetailed(+this.route.snapshot.paramMap.get('id')).subscribe((order: IOrder) => {
      this.order = order;
      this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
      this.toastr.error('Failed to get order details');
    });
  }

}
