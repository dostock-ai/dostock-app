import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {
  productsTitle = 'Productos';

  constructor(public shoppCartSvc: ShoppingCartService) { }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'products');
  }
}
