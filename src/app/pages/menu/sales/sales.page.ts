import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { SupabaseService } from '../services/supabase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  salesTitle = 'Ventas';
  products: any;
  productImages: any;
  currentUserID: any;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    private modalController: ModalController, 
    private supabase: SupabaseService,
    private authSvc: AuthService
  ) { }

  async ngOnInit() {
    this.currentUserID = this.authSvc.getCurrentUserId();

    this.products = await this.supabase.getProducts();
    console.log(this.products);

    this.productImages = await this.supabase.getProductImages(this.currentUserID);
    console.log('Product images: ', this.productImages);
    
    // realizar pipe, que junte products con products images y ahi mismo poner el url de cada producto para que se vea la imagen
  }

  async addProduct() {
    const modal = await this.modalController.create({
      component: AddProductComponent,
      componentProps: {
        // Aquí puedes pasar propiedades o datos adicionales al modal si es necesario
        // Ejemplo: data: { prop1: valor1, prop2: valor2 }
      }
    });
  
    await modal.present();
    // const { data } = await modal.onDidDismiss();
    // Aquí puedes manejar los datos que puedan devolverse cuando se cierre el modal (si lo necesitas)
    // Ejemplo: const resultado = data.resultado;
  }
}
