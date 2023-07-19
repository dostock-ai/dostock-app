import { Component, Input, OnInit } from '@angular/core';
import { MenuController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit, ViewWillEnter {
  @Input() title: any;
  appMenuSwipeGesture: any;
  public appPages = [
    { title: 'Venta', url: '/home/sales', icon: 'bag-check' },
    { title: 'Productos', url: '/home/products', icon: 'cube' },
    { title: 'Configuración', url: '/home/settings', icon: 'settings' },
  ];

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.menuCtrl.enable(false);
  }

}
