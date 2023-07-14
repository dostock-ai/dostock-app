import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Venta', url: '/sales', icon: 'bag-check' },
    { title: 'Productos', url: '/products', icon: 'cube' },
    { title: 'Configuración', url: '/settings', icon: 'settings' },
  ];
  
  constructor() {}
}
