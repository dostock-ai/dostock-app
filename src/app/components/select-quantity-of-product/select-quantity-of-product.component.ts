import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-quantity-of-product',
  templateUrl: './select-quantity-of-product.component.html',
  styleUrls: ['./select-quantity-of-product.component.scss'],
})
export class SelectQuantityOfProductComponent  implements OnInit {
  numberOfProducts = 1;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  closeModal(type: string) {
    this.numberOfProducts = type === 'cancel' ? 0 : this.numberOfProducts;
    this.modalController.dismiss(Number(this.numberOfProducts));
  }

  addAmount() {
    this.numberOfProducts++;
  }

  removeAmount() {
    if(this.numberOfProducts > 1) {
      this.numberOfProducts--;
    }
  }
}
