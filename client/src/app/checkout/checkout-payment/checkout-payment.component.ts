import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BasketService} from '../../basket/basket.service';
import {CheckoutService} from '../checkout.service';
import {ToastrService} from 'ngx-toastr';
import {IBasket} from '../../shared/models/basket';
import {IOrder, IOrderToCreate} from '../../shared/models/order';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutFrom: FormGroup;

  constructor(
    private basketService: BasketService, private checkoutService: CheckoutService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutFrom.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutFrom.get('addressForm').value
    };
  }

  submitOrder(): void {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(async (order: IOrder) => {
      this.toastr.success('Order created successfully');
      this.basketService.deleteLocalBasket(basket.id);
      const navigationExtras: NavigationExtras = {state: order};
      await this.router.navigate(['checkout/success'], navigationExtras);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }
}
