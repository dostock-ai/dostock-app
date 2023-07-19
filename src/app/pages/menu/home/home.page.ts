import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  appMenuSwipeGesture: any;
  public appPages = [
    { title: 'Venta', url: '/home/sales', icon: 'bag-check' },
    { title: 'Productos', url: '/home/products', icon: 'cube' },
    { title: 'Configuración', url: '/home/settings', icon: 'settings' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
