import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addImagesToProducts'
})
export class AddImagesToProductsPipe implements PipeTransform {

  transform(value: any, products: any, images: any): unknown {
    return products;
  }

}
