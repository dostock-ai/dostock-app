import { Component, HostListener, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  productsTitle = 'Productos';
  screenWidth: number;

  constructor(public shoppCartSvc: ShoppingCartService) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'products');
  }
}
