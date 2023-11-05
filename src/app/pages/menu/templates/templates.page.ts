import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { AuxFnsService } from 'src/app/services/aux-fns.service';
import { CurrentSelectedTemplate } from 'src/app/interfaces/current-selected-template';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  templatesSeccion = true;
  currentSelectedTemplate:CurrentSelectedTemplate = {};

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
            name: "Agua",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/agua.jpg'
          },
          {
            name: "Leche",
            sale_price: 20,
            buy_price: 8,
            description: 'Leche lala',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/leche.jpg'
          },
          {
            name: "Vainilla",
            sale_price: 20,
            buy_price: 8,
            description: 'Vainilla en bote',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/vainilla.jpg?t=2023-10-30T17%3A19%3A17.647Z'
          },
          {
            name: "Caramelo",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/caramelo.jpg'
          },
          {
            name: "Leche de almendra",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/leche_de_almendras.jpg?t=2023-11-01T15%3A58%3A04.627Z'
          },
          {
            name: "Azúcar",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/azucar.jpg'
          },
          {
            name: 'Chocolate',
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'Unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://ocawxswurzuxadztfqtw.supabase.co/storage/v1/object/public/templates/coffee/chocolate.jpeg?t=2023-11-01T16%3A04%3A05.592Z'
          }
        ]
      }
    },
  ]

  constructor(
    private modalController: ModalController, 
    private supabase: SupabaseService, 
    private loadingController: LoadingController,
    public auxFns: AuxFnsService,
    private authSvc: AuthService, 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'templates');
  }

  showTemplateData(template: any) {
    this.templatesSeccion = false;
    this.currentSelectedTemplate = template.categories;
  }

  async setTemplate() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.setCacheDontShowTemplates();
    await this.setTemplateToSupabase();
    this.auxFns.navigateTo('/home/sales');

    await loading.dismiss();
  }

  setCacheDontShowTemplates() {
    const currentUserId = this.authSvc.getCurrentUserId();
    localStorage.setItem(currentUserId + '/selectedTemplate', 'true');
  }

  async setTemplateToSupabase() {
    const products = this.filterAllProducts();
    await this.supabase.setTemplate(products);
  }

  filterAllProducts() {
    let products:any = [];
    Object.keys(this.currentSelectedTemplate || {}).forEach((category) => {
      (this.currentSelectedTemplate[category] || []).forEach((product:any) => {
        products.push(product);
      });
    });
    return products;
  }

  backToTemplatesSeccion() {
    this.templatesSeccion = true;
  }
}
