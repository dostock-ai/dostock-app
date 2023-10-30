import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  templatesSeccion = true;
  currentSelectedTemplate = {};

  templates = [
    {
      src: './../../assets/img/templates/default.png',
      title: 'Sin plantilla',
    },
    {
      src: './../../assets/img/templates/coffee.png',
      title: 'Cafetería',
      categories: {
        'Bebidas frías': [
          {
            name: 'Malteada de pay de limón',
            sale_price: 68,
            category: 'Bebidas frías',
            buy_price: 30,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '4567191221',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
            image_url: 'set image in supabase in folder templates?, and set a option to change the img'
          },
          {
            name: 'Frappé'
          },
          {
            name: 'Malteada de Óreo'
          },
          {
            name: 'Chamoyada'
          },
          {
            name: 'Capuccino helado saborizado'
          },
          {
            name: 'Soda italiana'
          },
          {
            name: 'Tisana helada'
          },
          {
            name: 'Smoothie'
          }
        ],
        'Bebidas calientes': [
          {
            name: "Espresso"
          },
          {
            name: "Americano"
          },
          {
            name: "Capuccino"
          },
          {
            name: "Capuccino con chocolate blanco"
          },
          {
            name: "Taro"
          },
          {
            name: "Chocolate"
          },
          {
            name: "Latte"
          },
          {
            name: "Matcha latte"
          },
          {
            name: "Cocteles con café"
          },
          {
            name: "Carajillo"
          },
          {
            name: "Café irlandés"
          },
          {
            name: "Gin tonic con café"
          },
          {
            name: "Café vienés"
          }
        ],
        'Bocadillos': [
          {
            name: "Emparedados"
          },
          {
            name: "Huevos al gusto"
          },
          {
            name: "Sincronizadas"
          },
          {
            name: "Hamburguesas"
          },
          {
            name: "Hot dogs"
          },
          {
            name: "Chilaquiles"
          },
          {
            name: "Enchiladas"
          },
          {
            name: "Tostadas"
          },
          {
            name: "Hot cakes"
          },
          {
            name: "Waffles"
          },
          {
            name: "Crepas"
          }
        ],
        'Postres': [
          {
            name: "Rosca de churros"
          },
          {
            name: "Donas"
          },
          {
            name: "Brownies"
          },
          {
            name: "Pays"
          }
        ],
        'Productos sin categoría': [
          {
            name: "Agua"
          },
          {
            name: "Leche"
          },
          {
            name: "Vainilla"
          },
          {
            name: "Caramelo"
          },
          {
            name: "Leche de almendra"
          },
          {
            name: "Azúcar"
          },
          {
            name: 'Chocolate'
          }
        ]
      }
    },
  ]

  constructor(private modalController: ModalController, private supabase: SupabaseService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'templates');
  }

  showTemplateData(template: any) {
    this.templatesSeccion = false;
    this.currentSelectedTemplate = template.categories;
  }

  // async setTemplate(templateData: string) {
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //   this.setCacheDontShowTemplates();
  //   this.setTemplateToSupabase(templateData);

  //   await loading.dismiss();
  // }

  setCacheDontShowTemplates() {
    localStorage.setItem('showTemplate', 'false');
  }

  setTemplateToSupabase(selectedTemplate: string) {
    this.supabase.setTemplate(selectedTemplate);
  }

  backToTemplatesSeccion() {
    this.templatesSeccion = true;
  }
}
