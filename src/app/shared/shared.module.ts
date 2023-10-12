import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationToolbarComponent } from './components/navigation-toolbar/navigation-toolbar.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [NavigationToolbarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavigationToolbarComponent
  ]
})
export class SharedModule {}
