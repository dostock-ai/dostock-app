import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/pages/menu/services/supabase.service';
import { LoadingController } from '@ionic/angular';
import { AuxFnsService } from 'src/app/services/aux-fns.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AuthService } from 'src/app/services/auth.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  implements OnInit {

  productData: any = {
    imageURL: './../../assets/img/default.png',
    // name, buy_price, sale_price, category, description, barcode
    // available_for_sale, type_sale, control_stock, current_stock
  };

  constructor(
    private modalController: ModalController, 
    private supabaseSvc: SupabaseService,
    private loadingController: LoadingController,
    private auxFns: AuxFnsService,
    private authSvc: AuthService,
    private alertController: AlertController,
    ) {
    }

  async ngOnInit() {
  }

  async saveProduct() {
    const loading = await this.loadingController.create();
    await loading.present();

    const currentUserID = this.authSvc.getCurrentUserId();
    const fileName = currentUserID + '/' + this.productData.name + '.jpeg';

    const data = await this.supabaseSvc.saveImage(this.productData.blob, fileName);
    

    this.productData.image_url = (await this.supabaseSvc.getImageUrl(fileName)).publicUrl;

    //! Optimziar despues para crar otro objeto para imagenes
    delete this.productData.blob;
    delete this.productData.imageURL;
    const error = await this.supabaseSvc.addProduct(this.productData);
    if (error) {
      console.log('Ocurrió un error al guardar el producto');
    } else {
      this.auxFns.showAlert('Producto guardado', 'El producto se guardó correctamente');
      this.closeModal();
    }

    this.productData = {
      imageURL: './../../assets/img/default.png',
    };
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

    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: base64Data,
    //   directory: Directory.Data
    // });

    const blob = await this.readAsBlob(photo);

    this.productData.imageURL = URL.createObjectURL(blob);
    this.productData.blob = blob;  
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
  
  async openAddCategoryModal() {
    const modal = await this.modalController.create({
      component: AddCategoryComponent,
      backdropDismiss: true,
      cssClass: 'modal-open-select-category',
      componentProps: {
        // Aquí puedes pasar propiedades o datos adicionales al modal si es necesario
        // Ejemplo: data: { prop1: valor1, prop2: valor2 }
        // backdrop es para que no te salgas
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        const selectedCategory = data['data'];
        this.productData.category = selectedCategory;
    });
  
  
    await modal.present();
    // const { data } = await modal.onDidDismiss();
    // Aquí puedes manejar los datos que puedan devolverse cuando se cierre el modal (si lo necesitas)
    // Ejemplo: const resultado = data.resultado;
  }

  scan() {
    BarcodeScanner.scan().then((result) => {
      // Handle the result
      console.log('scan: ', result);
      this.productData.barcode = result.text;
    }).catch((error) => {
      // Handle the error
      console.log('error: ', error);
    });
  }
}
