import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.scss'],
})
export class NavigationToolbarComponent {
  @Input() shoppingCartInfo: any = {};

  constructor(private router: Router) { }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}