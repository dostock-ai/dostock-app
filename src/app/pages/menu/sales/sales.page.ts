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
  categoriesData: any = {};

  constructor(
    private modalController: ModalController, 
    private supabaseSvc: SupabaseService,
  ) { }

  async ngOnInit() {
    await this.getCategoriesData();
  }

  async getCategoriesData() {
    const productsData = await this.supabaseSvc.getProducts();

    (productsData || [])?.forEach((product) => {
      const category = product.category;

      if (!this.categoriesData[category]) {
        this.categoriesData[category] = [];
      }
      this.categoriesData[category].push(product);
    })
    console.log(this.categoriesData);
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
