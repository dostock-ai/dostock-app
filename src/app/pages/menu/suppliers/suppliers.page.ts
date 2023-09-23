import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
})
export class SuppliersPage implements OnInit {
  suppliers: any[] = []; // Aquí puedes definir una lista de proveedores

  constructor() { }

  ngOnInit() {
    // Puedes realizar inicializaciones o cargar datos aquí
    this.loadSuppliers();
  }

  // Ejemplo de una función para cargar proveedores
  loadSuppliers() {
    // Aquí puedes hacer una llamada a un servicio o cargar datos
    // en la variable `suppliers` para mostrar en la página
    // Por ejemplo:
    this.suppliers = [
      { id: 1, name: 'Proveedor 1' },
      { id: 2, name: 'Proveedor 2' },
      // Agrega más proveedores según tus necesidades
    ];
  }
}
