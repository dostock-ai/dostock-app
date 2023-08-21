import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/pages/menu/services/supabase.service';

@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.scss'],
})
export class SelectTemplateComponent  implements OnInit {
  selectedTemplate = 'Default';
  templates = [
    {
      src: './../../assets/img/templates/default.png',
      title: 'Default',
      subtitle: 'Plantilla por defecto',
      alt: 'Default'
    },
    {
      src: './../../assets/img/templates/clothes.png',
      title: 'Ropa',
      subtitle: 'Pantalones, camisetas, vestidos...',
      alt: 'Ropa'
    },
    {
      src: './../../assets/img/templates/restaurant.png',
      title: 'Restaurante',
      subtitle: 'Platos, bebidas, postres...',
      alt: 'Restaurante'
    },
    {
      src: './../../assets/img/templates/fruit_store.png',
      title: 'Fruteria',
      subtitle: 'Manzana, pera, platano...',
      alt: 'Fruteria'
    },
    {
      src: './../../assets/img/templates/accessories.png',
      title: 'Accesorios',
      subtitle: 'Pulseras, collares, pendientes...',
      alt: 'Accesorios'
    },
    {
      src: './../../assets/img/templates/vulka.png',
      title: 'Vulka',
      subtitle: 'Llantas nuevas, reparación...',
      alt: 'Vulka'
    },
  ]

  constructor(private modalController: ModalController, private supabase: SupabaseService, private loadingController: LoadingController,) { }

  ngOnInit() {}

  async setTemplate(selectedTemplate: string) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.selectedTemplate = selectedTemplate;
    this.setTemplateToCache(selectedTemplate);
    this.setTemplateToSupabase(selectedTemplate);

    this.closeModal();
    await loading.dismiss();
  }

  setTemplateToCache(selectedTemplate: string) {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }

  setTemplateToSupabase(selectedTemplate: string) {
    this.supabase.setTemplate(selectedTemplate);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
