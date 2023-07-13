import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Venta', url: '/sales', icon: 'bag-check' },
    { title: 'Pedidos', url: '/orders', icon: 'cube' },
    { title: 'Productos', url: '/folder/favorites', icon: 'pricetags' },
    { title: 'Clientes', url: '/folder/archived', icon: 'people' },
    { title: 'Transacciones', url: '/folder/trash', icon: 'cash' },
    { title: 'Reportes', url: '/folder/spam', icon: 'stats-chart' },
    { title: 'Configuración', url: '/folder/trash', icon: 'settings'}
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
