import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  isToolbarActive:boolean = true;
  currentPage: string = '';
  currentTilte: string = '';

  constructor() { }
 
  // El activar y desactivar toolbar se realizo porque no se debe mostrar cuando esta en template
  activeToolbar() {
    this.isToolbarActive = true;
  }

  desactivateToolbar() {
    this.isToolbarActive = false;
  }

  getToolbar() {
    return this.isToolbarActive;
  }

  setCurrentPage(currentPage: string) {
    this.currentPage = currentPage;

    this.setCurrentTitle(currentPage);
  }

  setCurrentTitle(currentPage: string) {
    switch(currentPage) {
      case 'sales': 
        this.currentTilte = 'Ventas'
        break;
      case 'products': 
        this.currentTilte = 'Productos'
        break;
      case 'chat-ai':
        this.currentTilte = 'Chat-IA'
        break;
      case 'settings':
        this.currentTilte = 'Configuración'
        break;
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getCurrentTitle() {
    return this.currentTilte;
  }
}
