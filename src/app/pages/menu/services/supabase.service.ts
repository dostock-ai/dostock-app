import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor(private authSvc: AuthService) { }

  async addProduct(productData: any) {
    this.addUuidToProductData(productData);
    const { error } = await this.authSvc.supabase.from('stock').insert(productData);
    return error;
  }

  addUuidToProductData(productData: any) {
    const uuid = this.authSvc.getCurrentUserId();
    productData.user_id = uuid;
  }

  async setProductsOfTemplate(products: any) {
    const user_id = this.authSvc.getCurrentUserId();
    const { error } = await this.authSvc.supabase.from('user-data').update({ template: true }).eq('user_id', user_id);

    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      await this.authSvc.supabase.from('stock').insert({ user_id: user_id, ...product, template: true });
    }
  }

  async getSelectedTemplate() {
    const user_id = this.authSvc.getCurrentUserId();

    const { data, error } = await this.authSvc.supabase.from('user-data').select().eq('user_id', user_id);
    let selectedTemplate;
    if(data?.length === 1) {
      selectedTemplate = data[0]?.template;
    }
    return selectedTemplate;
  }

  async getProducts() {
    const user_id = this.authSvc.getCurrentUserId();
    const { data, error } = await this.authSvc.supabase.from('stock').select().eq('user_id', user_id);
    return data;
  }

  async saveImage(blob: any, fileName: string) {
    const { data, error } = await this.authSvc.supabase.storage.from('products').upload(fileName, blob);
    if (error) {
      console.log('Error uploading image:', error.message)
    } else {
      console.log('Image uploaded successfully:', data)
    }
    // const { data, error } = await this.authSvc.supabase.storage.from('products').download('my-image.jpg');
    return data;
  }

  async getImageUrl(fileName: string) {
    const { data } = await this.authSvc.supabase.storage.from('products').getPublicUrl(fileName)
    return data;
  }

  async getCategories() {
    const user_id = this.authSvc.getCurrentUserId();
    const { data, error } = await this.authSvc.supabase.from('user-data').select().eq('user_id', user_id);
    if(data) {
      return JSON.parse(data[0]?.categories);
    }
    return null;
  }

  //! Implementar cache para no llamar a la base de datos cada vez que entre al modal de agregar categoria
  async setCategories(categories: string) {
    const user_id = this.authSvc.getCurrentUserId();
    const { data, error } = await this.authSvc.supabase.from('user-data').update({categories: categories}).eq('user_id', user_id);
    return data;
  }
}
