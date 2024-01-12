import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { AuxFnsService } from 'src/app/services/aux-fns.service';
import { CurrentSelectedTemplate } from 'src/app/interfaces/current-selected-template';
import { AuthService } from 'src/app/services/auth.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage {
  templatesSeccion = true;
  currentSelectedTemplate:CurrentSelectedTemplate = {};
  currentCategories: any = [];

  templates = [
    {
      src: './../../assets/img/templates/coffee.png',
      title: 'Cafetería',
      categories: {
        'Bebidas frías': [
          {
            name: 'Malteada de pay de limón',
            description: '',
            category: 'Bebidas frías',
            sale_price: 10,
            buy_price: 5,
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/sign/templates/coffee-shop/cold-drinks/malteada-de-pay-de-limon.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZW1wbGF0ZXMvY29mZmVlLXNob3AvY29sZC1kcmlua3MvbWFsdGVhZGEtZGUtcGF5LWRlLWxpbW9uLmpwZyIsImlhdCI6MTcwMTU2MzA1NywiZXhwIjoyMDE2OTIzMDU3fQ.MxV5f7zJ12nedgsegDaK3KGQPFq79GuWw9ILxCSNIxI'
          },
          {
            name: 'Frappé',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/frappe.png?t=2023-12-03T01%3A09%3A16.154Z',
            sale_price: 15,
            category: 'Bebidas frías',
            buy_price: 7,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
          },
          {
            name: 'Malteada de Óreo',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/malteada-de-oreo.jpg?t=2023-12-03T01%3A10%3A10.088Z',
            sale_price: 30,
            category: 'Bebidas frías',
            buy_price: 15,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: 'Chamoyada',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/mangonadas.jpg?t=2023-12-03T01%3A10%3A44.628Z',
            sale_price: 40,
            category: 'Bebidas frías',
            buy_price: 20,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
          },
          {
            name: 'Capuccino helado saborizado',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/capuccino-helado.jpg?t=2023-12-03T01%3A19%3A02.499Z',
            sale_price: 50,
            category: 'Bebidas frías',
            buy_price: 25,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
          },
          {
            name: 'Soda italiana',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/soda-italiana.png?t=2023-12-03T01%3A19%3A43.243Z',
            sale_price: 60,
            category: 'Bebidas frías',
            buy_price: 30,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
          },
          {
            name: 'Tisana helada',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/tisana-fria.jpg?t=2023-12-03T01%3A20%3A23.071Z',
            sale_price: 80,
            category: 'Bebidas frías',
            buy_price: 40,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
          },
          {
            name: 'Smoothie',
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/cold-drinks/smoothie.png?t=2023-12-03T01%3A20%3A56.691Z',
            sale_price: 100,
            category: 'Bebidas frías',
            buy_price: 50,
            description: 'La malteada de pay de limón no es màs que una versión en bebida del conocido postre llamado "Carlota". Se trata de una mezcla de todo lo que lleva la receta original, pero que en este caso se licúa la leche evaporada, las galletas, el jugo de limón, etc.',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: true,
            current_stock: 50,
          }
        ],
        'Bebidas calientes': [
          {
            name: "Espresso",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/espresso.jpg',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Americano",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/americano.jpg',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Capuccino",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/capuchino.jpg?t=2023-12-03T00%3A40%3A00.577Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Capuccino con chocolate blanco",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/capuccino-chocolate-blanco.png?t=2023-12-03T00%3A41%3A27.446Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Taro",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/taro.png?t=2023-12-03T00%3A42%3A21.117Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Chocolate",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/chocolate.jpg?t=2023-12-03T00%3A47%3A58.643Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Latte",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/latte.jpg?t=2023-12-03T00%3A49%3A22.234Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Matcha latte",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/matcha-latte.jpg?t=2023-12-03T00%3A49%3A56.847Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Cocteles con café",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/cocteles-cafe.jpg?t=2023-12-03T00%3A51%3A58.961Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Carajillo",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/carajillo.jpg?t=2023-12-03T00%3A52%3A51.286Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Café irlandés",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/cafe-irlandes.jpg?t=2023-12-03T00%3A53%3A34.049Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Gin tonic con café",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/cafetonic.jpg?t=2023-12-03T01%3A04%3A37.092Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Café vienés",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/hot-drinks/cafe-vienes.png?t=2023-12-03T01%3A05%3A27.383Z',
            sale_price: 10,
            category: 'Bebidas calientes',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          }
        ],
        'Bocadillos': [
          {
            name: "Emparedados",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/emparedados.jpg?t=2023-12-03T20%3A55%3A18.915Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Huevos al gusto",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/huevos-al-gusto.jpg?t=2023-12-03T20%3A58%3A19.064Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Sincronizadas",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/sincronizada.jpg?t=2023-12-03T21%3A00%3A29.400Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Hamburguesas",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/hamburguesa.jpg',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Hot dogs",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/hotdogs.jpg?t=2023-12-03T21%3A09%3A46.208Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Chilaquiles",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/chilaquiles.png?t=2023-12-03T21%3A10%3A29.745Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Enchiladas",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/enchiladas-rojas.jpg?t=2023-12-03T21%3A11%3A31.881Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Tostadas",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/tostadas.jpg?t=2023-12-03T21%3A12%3A06.969Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Hot cakes",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/hot-cakes.png?t=2023-12-03T21%3A13%3A48.663Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Waffles",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/waffles.jpg?t=2023-12-03T21%3A13%3A54.960Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Crepas",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/sandwiches/crepas.jpg?t=2023-12-03T21%3A13%3A41.324Z',
            sale_price: 10,
            category: 'Bocadillos',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          }
        ],
        'Postres': [
          {
            name: "Churros",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/desserts/churros.jpg?t=2023-12-03T21%3A21%3A50.055Z',
            sale_price: 10,
            category: 'Postres',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Donas",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/desserts/donas.png?t=2023-12-03T21%3A23%3A26.687Z',
            sale_price: 10,
            category: 'Postres',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Brownies",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/desserts/brownies.jpg',
            sale_price: 10,
            category: 'Postres',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          },
          {
            name: "Pays",
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/desserts/pays.png?t=2023-12-03T21%3A28%3A37.901Z',
            sale_price: 10,
            category: 'Postres',
            buy_price: 5,
            description: '',
            barcode: '',
            type_sale: 'unidad',
            available_for_sale: true,
            control_stock: false,
            current_stock: null,
          }
        ],
        'Productos sin categoría': [
          {
            name: "Agua",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'unidad',
            category: null,
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/bonafont.png?t=2023-12-03T21%3A32%3A21.775Z'
          },
          {
            name: "Leche",
            sale_price: 20,
            buy_price: 8,
            description: 'Leche lala',
            barcode: '9823748232',
            type_sale: 'unidad',
            category: null,
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/leche.png?t=2023-12-03T21%3A32%3A52.743Z'
          },
          {
            name: "Vainilla",
            sale_price: 20,
            buy_price: 8,
            description: 'Vainilla en bote',
            barcode: '9823748232',
            type_sale: 'unidad',
            category: null,
            available_for_sale: false,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/vainilla.png?t=2023-12-03T21%3A33%3A44.922Z'
          },
          {
            name: "Caramelo",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'unidad',
            category: null,
            available_for_sale: false,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/caramelo.png?t=2023-12-03T21%3A34%3A17.007Z'
          },
          {
            name: "Leche de almendra",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'unidad',
            category: null,
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/leche-de-almendra.jpg?t=2023-12-03T21%3A35%3A12.854Z'
          },
          {
            name: "Azúcar",
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'unidad',
            category: null,
            available_for_sale: true,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/azucar.png?t=2023-12-03T21%3A35%3A51.505Z'
          },
          {
            name: 'Chocolate',
            sale_price: 20,
            buy_price: 8,
            description: 'Agua purificada',
            barcode: '9823748232',
            type_sale: 'unidad',
            available_for_sale: true,
            category: null,
            control_stock: true,
            current_stock: 120,
            image_url: 'https://wuifdiobrwfkybbamllq.supabase.co/storage/v1/object/public/templates/coffee-shop/default/chocolate.jpg?t=2023-12-03T21%3A36%3A31.492Z'
          }
        ]
      },
      categoriesArray: ['Bebidas frías', 'Bebidas calientes', 'Bocadillos', 'Postres']
    },
  ]

  constructor(
    private modalController: ModalController, 
    private supabase: SupabaseService, 
    private loadingController: LoadingController,
    public auxFns: AuxFnsService,
    private authSvc: AuthService,
    public toolbarSvc: ToolbarService
  ) { }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'templates');
  }

  showTemplateData(template: any) {
    this.templatesSeccion = false;
    this.currentSelectedTemplate = template.categories;
    this.currentCategories = template.categoriesArray;
  }

  async setTemplate() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.setCategoriesOfTemplate();
    await this.setTemplateToSupabase();
    this.setCacheDontShowTemplates();
    
    this.auxFns.navigateTo('/home/sales');
    //TODO - Se vuelve a activar porque en home se desactiva para que en template no salga
    this.toolbarSvc.activeToolbar();

    await loading.dismiss();
  }

  async setCategoriesOfTemplate() {
    let categories = await this.supabase.getCategories();
    categories = categories ? [...categories, ...this.currentCategories] : this.currentCategories;
    await this.supabase.setCategories(categories);
  }

  setCacheDontShowTemplates() {
    const currentUserId = this.authSvc.getCurrentUserId();
    localStorage.setItem(currentUserId + '/selectedTemplate', 'true');
  }

  async setTemplateToSupabase() {
    const products = this.filterAllProducts();

    // Agregamos todos los productos a su inventario
    await this.supabase.setProductsOfTemplate(products);

    // Agregamos todas las categorias
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
