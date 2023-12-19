import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products',
  pure: false
})
export class ProductsPipe implements PipeTransform {

  transform(products: any, withCategory: Boolean) {
    if (!products) {
      return { data: {}, hasCategories: false };
    }

    const result: any = { data: {}, hasCategories: false };

    if (withCategory) {
      products = products.filter((product: any) => product.category !== null);

      (products || []).forEach((product: any) => {
        const category = product.category;

        if (!result.data[category]) {
          result.data[category] = [];
        }

        result.data[category].push(product);
      });

      result.hasCategories = Object.keys(result.data).length > 0;

      return result;
    } else {
      result.data = products.filter((product: any) => product.category === null);
      result.hasCategories = result.data.length > 0;

      return result;
    }
  }
}
