import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  isToolbarActive:boolean = true;
  currentPage: string = '';

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
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
