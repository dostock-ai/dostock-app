import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts: any;

  constructor(private supabaseSvc: SupabaseService) { }

  async getAllUserProducts() {
    if(this.allProducts && this.allProducts.length > 0) {
      console.log('Now we have data, then we return the variable allProducts', this.allProducts);
      return this.allProducts;
    }
    this.allProducts = await this.supabaseSvc.getProducts();
    console.log('AllProducts service: ', this.allProducts);
    
    return this.allProducts;
  }
}
