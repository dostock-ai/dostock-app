import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/pages/menu/services/toolbar.service';
import { AuxFnsService } from 'src/app/services/aux-fns.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.scss'],
})
export class NavigationToolbarComponent {
  @Input() shoppingCartInfo: any = {};
  private auxFns = inject(AuxFnsService);

  constructor(private router: Router, public toolbarSvc: ToolbarService) { }

  navigateTo(page: string) {
    this.auxFns.navigateTo('/home/' + page);
    this.toolbarSvc.setCurrentPage(page);
  }
}