import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settingsTitle = 'Configuración';
  screenWidth: number;

  constructor(private authSvc: AuthService, private alertController: AlertController, private loadingController: LoadingController) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
  }

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

            await this.authSvc.signOut();
            await loading.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}
