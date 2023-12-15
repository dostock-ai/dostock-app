import { Component, HostListener } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(private authSvc: AuthService, private alertController: AlertController, private loadingController: LoadingController) { }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'settings');
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

            localStorage.setItem('redirectUrl', 'sales');
            await this.authSvc.signOut();
            await loading.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}
