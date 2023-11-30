import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationToolbarComponent } from './components/navigation-toolbar/navigation-toolbar.component';
import { BarcodeScanningModalComponent } from './components/barcode-scanning-modal/barcode-scanning-modal.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { IonicModule } from '@ionic/angular';
import { ProductsPipe } from './pipes/products.pipe';


@NgModule({
  declarations: [NavigationToolbarComponent, BarcodeScanningModalComponent, ProductsPipe, ProductCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavigationToolbarComponent, BarcodeScanningModalComponent, ProductsPipe, ProductCardComponent
  ]
})
export class SharedModule {}
