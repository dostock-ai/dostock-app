import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/auth/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'chat-ai',
  //   loadChildren: () => import('./pages/menu/chat-ai/chat-ai.module').then( m => m.ChatAIPageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'sales',
  //   loadChildren: () => import('./pages/menu/sales/sales.module').then( m => m.SalesPageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./pages/menu/products/products.module').then( m => m.ProductsPageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./pages/menu/settings/settings.module').then( m => m.SettingsPageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'suppliers',
  //   loadChildren: () => import('./pages/menu/suppliers/suppliers.module').then( m => m.SuppliersPageModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/menu/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'templates',
    loadChildren: () => import('./pages/menu/templates/templates.module').then( m => m.TemplatesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
