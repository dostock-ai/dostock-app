import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/pages/menu/services/toolbar.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.scss'],
})
export class NavigationToolbarComponent {
  @Input() shoppingCartInfo: any = {};

  constructor(private router: Router, public toolbarSvc: ToolbarService) { }

  navigateTo(page: string) {
    this.router.navigate(['/home/' + page]);

    this.toolbarSvc.setCurrentPage(page);
  }
}