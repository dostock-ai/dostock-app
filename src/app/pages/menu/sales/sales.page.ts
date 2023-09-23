import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { SupabaseService } from '../services/supabase.service';
import { AuthService } from 'src/app/services/auth.service';
import { SelectQuantityOfProductComponent } from 'src/app/components/select-quantity-of-product/select-quantity-of-product.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  salesTitle = 'Ventas';
  categoriesData: any = {};
  categoryInfo: any = {
    inside: false,
    data: [],
    name: ''
  };
  shoppingCartInfo: any = {
    amount: 0,
    products: {},
    totalProducts: 0,
    active: false
  }

  constructor(
    private modalController: ModalController, 
    private supabaseSvc: SupabaseService,
    public popoverController: PopoverController,
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

  openCategory(categoryKey: string) {
    this.categoryInfo.inside = true;
    this.categoryInfo.data = this.categoriesData[categoryKey];
    this.categoryInfo.name = categoryKey;
  }

  getString(input:any) {
    return String(input);
  }

  backToCategoriesSeccion() {
    this.categoryInfo = {
      inside: false,
      data: [],
      name: ''
    };
  }

  async selectQuantityOfProduct(product: any) {
    const modal = await this.modalController.create({
      component: SelectQuantityOfProductComponent,
      cssClass: 'modal-select-quantity-product',
      componentProps: {
        // Aquí puedes pasar propiedades o datos adicionales al modal si es necesario
        // Ejemplo: data: { prop1: valor1, prop2: valor2 }
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        const numberOfProducts = data['data'];
        if(numberOfProducts > 0) {
          this.addProductToShoppingCart(product, numberOfProducts);
        }
    });
  
    await modal.present();
  }
    
  addProductToShoppingCart(product: any, numberOfProducts: number) {
    if(!this.shoppingCartInfo.products[product.id]) {
      this.shoppingCartInfo.products[product.id] = product;
    }

    this.shoppingCartInfo.amount += product.sale_price * numberOfProducts;
    this.shoppingCartInfo.totalProducts += numberOfProducts;

    if(Object.keys(this.shoppingCartInfo.products).length > 0) {
      this.shoppingCartInfo.active = true;
    } else {
      this.shoppingCartInfo.active = false;
    }
  }
}
