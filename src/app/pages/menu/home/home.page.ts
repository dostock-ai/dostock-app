import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { SelectTemplateComponent } from 'src/app/components/select-template/select-template.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  template: any;
  appMenuSwipeGesture: any;
  public appPages = [
    { title: 'Venta', url: '/home/sales', icon: 'bag-check' },
    { title: 'Productos', url: '/home/products', icon: 'cube' },
    { title: 'Proveedores', url: '/home/suppliers', icon: 'airplane' },
    { title: 'Chat-IA (Tory)', url: '/home/chat-ai', icon: 'chatbox-ellipses' },
    { title: 'Configuración', url: '/home/settings', icon: 'settings' },
  ];

  constructor(private authSvc: AuthService, private alertController: AlertController, private loadingController: LoadingController, private modalController: ModalController) { }

  ngOnInit() {
    this.template = localStorage.getItem('selectedTemplate');
    if(!this.template) {
      this.selectTemplate();
    }
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

  selectTemplate() {
    this.openSelectTemplateModal();
  }

  async openSelectTemplateModal() {
    const modal = await this.modalController.create({
      component: SelectTemplateComponent,
      backdropDismiss: false,
      componentProps: { }
    });
  
    await modal.present();
  }
} 
