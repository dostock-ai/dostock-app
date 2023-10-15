import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationToolbarComponent } from './components/navigation-toolbar/navigation-toolbar.component';
import { BarcodeScanningModalComponent } from './components/barcode-scanning-modal/barcode-scanning-modal.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [NavigationToolbarComponent, BarcodeScanningModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavigationToolbarComponent, BarcodeScanningModalComponent
  ]
})
export class SharedModule {}
