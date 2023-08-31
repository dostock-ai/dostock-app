import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/pages/menu/services/supabase.service';
import { LoadingController } from '@ionic/angular';
import { AuxFnsService } from 'src/app/services/aux-fns.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  implements OnInit {
  productData: any = {
    // name, buy_price, sale_price, category, description, barcode
    // available_for_sale, type_sale, control_stock, current_stock
  };

  constructor(
    private modalController: ModalController, 
    private supabaseSvc: SupabaseService, 
    private loadingController: LoadingController,
    private auxFns: AuxFnsService
    ) { }

  ngOnInit() {
    
  }

  async saveProduct() {
    const loading = await this.loadingController.create();
    await loading.present();

    const error = await this.supabaseSvc.addProduct(this.productData);
    if (error) {
      console.log('Ocurrió un error al guardar el producto');
    } else {
      this.auxFns.showAlert('Producto guardado', 'El producto se guardó correctamente');
      this.closeModal();
    }

    this.productData = {};
    await loading.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90, // 0 - 100
      allowEditing: false, // true
      resultType: CameraResultType.Uri, // Base64, DataUrl or Uri
      source: CameraSource.Photos, // Camera, Photos or Prompt
    });

    if(image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    // const base64Data = await this.readAsBase64(photo);
    const fileName = Date.now() + '.jpeg';

    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: base64Data,
    //   directory: Directory.Data
    // });

    const blob = await this.readAsBlob(photo);

    this.productData.imageURL = URL.createObjectURL(blob);
    const data = await this.supabaseSvc.saveImage(blob);
    console.log('data', data);
    
    
    // return {
    //   filepath: fileName,
    //   webviewPath: photo.webPath
    // };
  }

  // Pasar a auxFns? si se ocupan en otros componentes
  private async readAsBlob(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    console.log('blob', blob);
    
  
    return blob;
  }
}
