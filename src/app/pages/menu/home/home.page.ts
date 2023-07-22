import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authSvc: AuthService, private alertController: AlertController, private loadingController: LoadingController,) { }

  ngOnInit() {
  }

  async signOut() {
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: async () => {
            const loading = await this.loadingController.create();
            await loading.present();

            await this.authSvc.signOut();
            await loading.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}