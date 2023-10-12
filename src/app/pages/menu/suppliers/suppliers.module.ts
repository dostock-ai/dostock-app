import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SuppliersPageRoutingModule } from './suppliers-routing.module';
import { SuppliersPage } from './suppliers.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuppliersPageRoutingModule,
    SharedModule
  ],
  declarations: [SuppliersPage]
})
export class SuppliersPageModule {}
