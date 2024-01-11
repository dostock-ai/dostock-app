import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts: any = [];
  currentCategory: any = {
    inside: false,
    data: [],
    nameCategory: '',
    class: ''
  };

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

  setCurrentCategory(categoryKey: string, categoryValue: any) {
    this.currentCategory.inside = true;
    this.currentCategory.data = categoryValue;
    this.currentCategory.nameCategory = categoryKey;
    this.currentCategory.class = 'selected_item_card';
  }

  getCurrentCategory() {
    return this.currentCategory;
  }

  deleteCurrentCategory() {
    this.currentCategory = {
      inside: false,
      data: [],
      nameCategory: '',
      class: ''
    };
  }

  setNewProductInCurrentCategory(product: any) {
    if(!this.currentCategory.inside || this.currentCategory.nameCategory !== product.category) {
      return;
    }

    this.currentCategory.data.push(product);
  }
}
