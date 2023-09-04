import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';
import { AddImagesToProductsPipe } from '../pipes/add-images-to-products.pipe';

import { SalesPage } from './sales.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule,
  ],
  declarations: [SalesPage, AddImagesToProductsPipe]
})
export class SalesPageModule {}
