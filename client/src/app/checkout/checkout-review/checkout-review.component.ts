import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IBasket} from '../../shared/models/basket';
import {BasketService} from '../../basket/basket.service';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper: CdkStepper;
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent(): Subscription {
    return this.basketService.createPaymentIntent().subscribe(() => {
      this.appStepper.next();
    }, () => {
    });
  }

}
