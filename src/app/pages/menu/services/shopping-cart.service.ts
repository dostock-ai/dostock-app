import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartInfo: any = {
    amount: 0,
    products: {},
    totalProducts: 0,
  }

  constructor() { }

  addProductToShoppingCart(product: any, numberOfProducts: number) {
    if(!this.shoppingCartInfo.products[product.id]) {
      this.shoppingCartInfo.products[product.id] = product;
    }

    this.shoppingCartInfo.amount += product.sale_price * numberOfProducts;
    this.shoppingCartInfo.totalProducts += numberOfProducts;
  }

  getShoppingCartInfo() {
    return this.shoppingCartInfo;
  }
}
