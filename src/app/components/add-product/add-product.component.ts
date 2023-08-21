import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/pages/menu/services/supabase.service';
import { LoadingController } from '@ionic/angular';
import { AuxFnsService } from 'src/app/services/aux-fns.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  implements OnInit {
  productData: any = {
    // name, buy_price, sale_price, category, description, barcode
    // available_for_sale, type_sale, control_stock, current_stock
  };

  constructor(
    private modalController: ModalController, 
    private supabaseSvc: SupabaseService, 
    private loadingController: LoadingController,
    private auxFns: AuxFnsService
    ) { }

  ngOnInit() {}

  async saveProduct() {
    const loading = await this.loadingController.create();
    await loading.present();

    const error = await this.supabaseSvc.addProduct(this.productData);
    if (error) {
      console.log('Ocurrió un error al guardar el producto');
    } else {
      this.auxFns.showAlert('Producto guardado', 'El producto se guardó correctamente');
      this.closeModal();
    }

    this.productData = {};
    await loading.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
