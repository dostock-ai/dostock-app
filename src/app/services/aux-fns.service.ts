import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuxFnsService {

  constructor(private router: Router, private alertController: AlertController) { }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

  sleep(ms: number) {
    setTimeout(() => {}, ms);
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
