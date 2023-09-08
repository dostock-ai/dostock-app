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
  productsData: any;
  productImages: any;
  currentUserID: any;

  constructor(
    private modalController: ModalController, 
    private supabase: SupabaseService,
    private authSvc: AuthService
  ) { }

  async ngOnInit() {
    this.currentUserID = this.authSvc.getCurrentUserId();

    this.productsData = await this.supabase.getProducts();
    console.log(this.productsData);
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
