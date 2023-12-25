import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { SelectTemplateComponent } from 'src/app/components/select-template/select-template.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuxFnsService } from 'src/app/services/aux-fns.service';
import { SupabaseService } from '../services/supabase.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  template: any;
  appMenuSwipeGesture: any;
  public appPages = [
    { title: 'Ventas', url: '/home/sales', icon: 'bag-check', currentPage: 'sales' },
    { title: 'Productos', url: '/home/products', icon: 'cube', currentPage: 'products' },
    // { title: 'Proveedores', url: '/home/suppliers', icon: 'airplane' },
    { title: 'Chat-IA', url: '/home/chat-ai', icon: 'chatbox-ellipses', currentPage: 'chat-ai' },
    { title: 'Configuración', url: '/home/settings', icon: 'settings', currentPage: 'settings' },
  ];
  currentPage = 'Ventas';
  currentTitle = 'Ventas';

  screenWidth: number;

  constructor(
    private authSvc: AuthService, 
    private alertController: AlertController, 
    private loadingController: LoadingController, 
    private modalController: ModalController,
    public auxFns: AuxFnsService,
    private supabase: SupabaseService,
    public shoppCartSvc: ShoppingCartService,
    public toolbarSvc: ToolbarService,
  ) { 
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }  

  async ngOnInit() {
    const currentUserId = this.authSvc.getCurrentUserId();
    // localStorage.setItem(currentUserId + '/selectedTemplate', '');
    this.template = localStorage.getItem(currentUserId + '/selectedTemplate') || await this.supabase.getSelectedTemplate();
    if(!this.template) {
      //TODO - Cuando continue sin plantilla o eliga una plantilla se tiene que volver a activar
      this.toolbarSvc.desactivateToolbar();
      setTimeout(() => {}, 0); // Sirve para que primero espere a que se desactive y ya luego cargue templates
      this.auxFns.navigateTo('/home/templates');
      // this.selectTemplate();
    }
  }

  changeCurrentPage(currentPage: string) {
    this.toolbarSvc.setCurrentPage(currentPage);
    this.currentPage = currentPage;
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

  async selectTemplate() {
    const modal = await this.modalController.create({
      component: SelectTemplateComponent,
      backdropDismiss: false,
      componentProps: { }
    });
  
    await modal.present();
  }
}
