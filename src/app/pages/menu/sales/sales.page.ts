import { Component, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { SupabaseService } from '../services/supabase.service';
import { AuthService } from 'src/app/services/auth.service';
import { SelectQuantityOfProductComponent } from 'src/app/components/select-quantity-of-product/select-quantity-of-product.component';
import { SalesFilterComponent } from 'src/app/components/sales-filter/sales-filter.component';
import { ScanService } from 'src/app/services/scan.service';
import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from 'src/app/shared/components/barcode-scanning-modal/barcode-scanning-modal.component';
import { DialogService } from 'src/app/core/dialog.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  salesTitle = 'Ventas';
  productsWithoutCategory: any = {}

  allProducts: any = [];
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

  querySearchBar: string = '';
  resultsSearchBar: any = [];

  screenWidth: number;

  constructor(
    private modalController: ModalController, 
    private supabaseSvc: SupabaseService,
    public popoverController: PopoverController,
    private scanSvc: ScanService,

    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }
  

  async ngOnInit() {
    await this.getCategoriesData();
  }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'sales');
  }

  async getCategoriesData() {
    this.allProducts = await this.supabaseSvc.getProducts();
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

  openCategory(categoryKey: string, categoryValue: any) {
    this.categoryInfo.inside = true;
    this.categoryInfo.data = categoryValue;
    this.categoryInfo.name = categoryKey;

    console.log(categoryValue, this.categoryInfo.data);
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

  handleInputSearchProduct(event: any) {
    this.querySearchBar = event.target.value.toLowerCase();
    this.resultsSearchBar = this.allProducts.filter((product: any) => product.name.toLowerCase().indexOf(this.querySearchBar) > -1);
  }

  async openSalesFilterModal() {
    const modal = await this.modalController.create({
      component: SalesFilterComponent,
      cssClass: 'small-modal',
      componentProps: {}
    });

    await modal.present();
  }

  async scan1() {
    const barcode = await this.scanSvc.scan1();

    // Despues de obtener el codigo abrir el modal de 
    // add-product y enviarle el barcode como parametro

    const modal = await this.modalController.create({
      component: AddProductComponent,
      componentProps: {
        barcode: barcode
      }
    });

    await modal.present();
  }

  async scan() {
    let isSupportedRes, isPermissionGrantedRes;
    try {
      isSupportedRes = await BarcodeScanner.isSupported();
      isPermissionGrantedRes = await BarcodeScanner.checkPermissions();
    } catch (error) {
      console.log(error);
    }

    console.log('IsSupported: ', isSupportedRes?.supported);

    if(isPermissionGrantedRes?.camera === 'granted') {
      console.log('isPermissionGranted: ', isPermissionGrantedRes);
    }

    const formats:any = [];
    const lensFacing = LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: BarcodeScanningModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then(async (result:any) => {
      const barcode = result.data?.barcode;
      if (barcode) {
        console.log('barcode: ', barcode);

        const modal = await this.modalController.create({
          component: AddProductComponent,
          componentProps: {
            barcode: barcode.displayValue
          }
        });
    
        await modal.present();
      }
    });
  }
}