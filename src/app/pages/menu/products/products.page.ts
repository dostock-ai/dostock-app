import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  allProducts: any = [];

  constructor(public shoppCartSvc: ShoppingCartService, public productsSvc: ProductsService) { }

  async ngOnInit() {
    await this.getCategoriesData();
  }

  async getCategoriesData() {
    this.allProducts = await this.productsSvc.getAllUserProducts();
  }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'products');
  }
}
