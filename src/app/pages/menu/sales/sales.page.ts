import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { SelectQuantityOfProductComponent } from 'src/app/components/select-quantity-of-product/select-quantity-of-product.component';
import { SalesFilterComponent } from 'src/app/components/sales-filter/sales-filter.component';
import { ScanService } from 'src/app/services/scan.service';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from 'src/app/shared/components/barcode-scanning-modal/barcode-scanning-modal.component';
import { DialogService } from 'src/app/core/dialog.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  productsWithoutCategory: any = {}

  allProducts: any = [];
  currentCategory: any = {
    inside: false,
    data: [],
    nameCategory: '',
    class: ''
  };

  // shoppingCartInfo: any = {
  //   amount: 0,
  //   products: {},
  //   totalProducts: 0,
  // }

  querySearchBar: string = '';
  resultsSearchBar: any = [];

  constructor(
    private modalController: ModalController,
    public popoverController: PopoverController,
    private scanSvc: ScanService,
    private readonly dialogService: DialogService,
    public shoppCartSvc: ShoppingCartService,
    public productsSvc: ProductsService,
  ) { }

  async ngOnInit() {
    await this.productsSvc.getAllUserProducts();
    this.allProducts = this.productsSvc.getAllProducts();
  }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'sales');
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

    const { data } = await modal.onDidDismiss();
    if(data) {
      this.productsSvc.setProduct(data);
      this.allProducts = this.productsSvc.getAllProducts();
      
      this.productsSvc.setNewProductInCurrentCategory(data);
      this.currentCategory = this.productsSvc.getCurrentCategory();
    }
  }

  openCategory(categoryKey: string, categoryValue: any) {
    const nameCategoryHasValue = this.currentCategory.nameCategory != '';
    const equalNameCategory = this.currentCategory.nameCategory === categoryKey;
    if(nameCategoryHasValue && equalNameCategory) {
      this.backToCategoriesSeccion();
      return;
    }

    this.productsSvc.setCurrentCategory(categoryKey, categoryValue);
    this.currentCategory = this.productsSvc.getCurrentCategory();
  }

  getString(input:any) {
    return String(input);
  }

  backToCategoriesSeccion() {
    this.productsSvc.deleteCurrentCategory();
    this.currentCategory = this.productsSvc.getCurrentCategory();
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
    this.shoppCartSvc.addProductToShoppingCart(product, numberOfProducts);
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

  checkCardClass() {
    return this.currentCategory.class || '';
  }

  getCurrentCategoryName() {
    return this.currentCategory.nameCategory || '';
  }
}