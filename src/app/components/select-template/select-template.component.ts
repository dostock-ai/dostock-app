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
      title: 'Sin plantilla',
    },
    {
      src: './../../assets/img/templates/coffee.png',
      title: 'Cafetería',
    },
  ]

  constructor(private modalController: ModalController, private supabase: SupabaseService, private loadingController: LoadingController) { }

  ngOnInit() {}

  async setTemplate(selectedTemplate: string) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.selectedTemplate = selectedTemplate;
    this.setTemplateToCache(selectedTemplate);
    // this.setTemplateToSupabase(selectedTemplate);

    this.closeModal();
    await loading.dismiss();
  }

  setTemplateToCache(selectedTemplate: string) {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }

  // setTemplateToSupabase(selectedTemplate: string) {
  //   this.supabase.setTemplate();
  // }

  closeModal() {
    this.modalController.dismiss();
  }
}
