import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full',
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales/sales.module').then( m => m.SalesPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'suppliers',
        loadChildren: () => import('../suppliers/suppliers.module').then( m => m.SuppliersPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'chat-ai',
        loadChildren: () => import('../chat-ai/chat-ai.module').then( m => m.ChatAIPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'templates',
        loadChildren: () => import('../templates/templates.module').then( m => m.TemplatesPageModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
