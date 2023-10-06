import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addImagesToProducts'
})
export class AddImagesToProductsPipe implements PipeTransform {

  transform(value: any, products: any, images: any): unknown {
    return products;
  }

}

// call pipe with parameters < *ngFor="[] | addImagesToProducts : productsData : productImages as products">   *ngFor="let product of productsData"