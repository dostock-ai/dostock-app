import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent  implements OnInit {
  @Input() public product: any;
  amount: number = 1;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  
  ionViewDidEnter() {
    console.log('Product: ', this.product);
  }

  closeModal() {
    // productData?: any
    this.modalController.dismiss(); //productData
  }
}
