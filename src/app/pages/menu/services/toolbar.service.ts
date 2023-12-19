import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  isToolbarActive:boolean = true;

  constructor() { }
  
  activeToolbar() {
    this.isToolbarActive = true;
  }

  desactivateToolbar() {
    this.isToolbarActive = false;
  }

  getToolbar() {
    return this.isToolbarActive;
  }
}
