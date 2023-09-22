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
  categories!: Categories;
  /*
   categories:any = {
    ropa: {
      config:{
        disabled: true/false,
        isChecked: true/false
      }
    }
   }
  */

  constructor(private modalController: ModalController, private supabaseSvc: SupabaseService,) {}

  async ngOnInit() {
    this.categories = await this.getCategories();
    console.log(this.categories);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  selectCategory(categoryName: any) {
    console.log(this.categories[categoryName], categoryName, this.categories);
    const isChecked= this.categories[categoryName].isChecked;
    const categoriesCopy = JSON.parse(JSON.stringify(this.categories));
    Object.keys(categoriesCopy).forEach((categoryKey) => {
      if (categoryKey != categoryName){
        this.categories[categoryKey].disabled = isChecked ? true : false;
      }
    });
  }

  async getCategories(){
    const categories : any = {}
    const categoriesDB=await this.supabaseSvc.getCategories();
    categoriesDB.forEach((category:any) => {
      categories[category] = {

          disabled: false,
          isChecked: false
      }; // Puedes asignar un valor predeterminado si lo deseas
    });
    return categories;
  }

}
