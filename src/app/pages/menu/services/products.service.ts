import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts: any = [];

  constructor(private supabaseSvc: SupabaseService) { }

  async getAllUserProducts() {
    if(this.allProducts && this.allProducts.length > 0) {
      return this.allProducts;
    }
    this.allProducts = await this.supabaseSvc.getProducts();
  }

  getAllProducts() {
    return this.allProducts;
  }

  setProduct(product: any) {
    this.allProducts.push(product);
  }
}
