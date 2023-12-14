import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/pages/menu/services/supabase.service';
import { Categories } from 'src/app/interfaces/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {
  addCategorySection = false;
  currentCategory = '';
  categories: Categories = {};
  /*
   categories:any = {
    ropa: {
      disabled: true/false,
      isChecked: true/false
    }
   }
  */

  constructor(private modalController: ModalController, private supabaseSvc: SupabaseService,) {}

  async ngOnInit() {
    this.categories = await this.getCategories();
    // console.log(this.categories);
  }

  closeModal(value?: any) {
    value ? this.modalController.dismiss(value) : this.modalController.dismiss();
  }

  selectCategoryAction(categoryName: any) {
    /*
      *Cuando se le da clic al checkboux automaticamente this.categories[categoryName].isChecked 
      *cambia de valor a true, o sea que no se ocupa cambiar a true aqui en el TypeScript
    */
    const isChecked= this.categories[categoryName].isChecked;
    const categoriesCopy = JSON.parse(JSON.stringify(this.categories));

    // Si es true es porque se le dio clic y lo cambio a true, si es false es porque deselecciono el checkbox
    this.currentCategory =  this.categories[categoryName].isChecked ? categoryName : '';    
    this.disableOrActivateOtherCategories(categoriesCopy, categoryName, isChecked);
  }

  disableOrActivateOtherCategories(categoriesCopy: any, categoryName: any, isChecked: any) {
    Object.keys(categoriesCopy || {}).forEach((categoryKey) => {
      const isDifferentCategory = categoryKey != categoryName;
      if (isDifferentCategory){
        this.categories[categoryKey].disabled = isChecked ? true : false;
      }
    });
  }

  async getCategories() {
    const categories : any = {}
    const categoriesDB=await this.supabaseSvc.getCategories();
    (categoriesDB || []).forEach((category:any) => {
      categories[category] = {

          disabled: false,
          isChecked: false
      }; // Puedes asignar un valor predeterminado si lo deseas
    });
    return categories;
  }

  activeAddCategorySection() {
    this.addCategorySection = true;
  }

  desactiveAddCategorySection() {
    this.addCategorySection = false;
  }

  selectCategoryComplete() {
    this.closeModal(this.currentCategory);
  }
}
