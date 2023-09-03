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

  async setTemplate(selectedTemplate: string) {
    const user_id = this.authSvc.getCurrentUserId();
    console.log(this.authSvc.getCurrentUser());
    
    const { error } = await this.authSvc.supabase.from('user-data').update({ template: selectedTemplate }).eq('user_id', user_id);
    console.log(error);
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

  async getProductImages(currentId: string) {
    const { data, error } = await this.authSvc.supabase.storage.from('products').list(currentId);
    // const { data, error } = await this.authSvc.supabase.storage.from('products').download(currentId + '/Balon de basket.jpeg');
    if (error) {
      console.log('Error uploading image:', error.message)
    } else {
      console.log('Image uploaded successfully:', data)
    }
    return data;
  }
}
