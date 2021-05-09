import {Component, OnInit} from '@angular/core';
import {BasketService} from './basket/basket.service';
import {AccountService} from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService: BasketService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  private loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
      }, error => {
        console.log(error);
      });
    }
  }

  private loadUser(): void {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('loaded user');
    }, error => {
      console.log(error);
    });
  }
}
