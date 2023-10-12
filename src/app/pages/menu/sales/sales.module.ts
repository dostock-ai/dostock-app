import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalesPageRoutingModule } from './sales-routing.module';
import { AddImagesToProductsPipe } from '../pipes/add-images-to-products.pipe';
import { SalesPage } from './sales.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesFilterComponent } from 'src/app/components/sales-filter/sales-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule,
    SharedModule
  ],
  declarations: [SalesPage, AddImagesToProductsPipe, SalesFilterComponent]
})
export class SalesPageModule {}
