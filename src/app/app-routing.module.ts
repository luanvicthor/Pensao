import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'add', loadChildren: './pages/add/add.module#AddPageModule' },
  { path: 'addUsuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  { path: 'add-produto', loadChildren: './pages/add-produto/add-produto.module#AddProdutoPageModule' },
  { path: 'perfil-usuario', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'perfil-produto', loadChildren: './pages/perfil-produto/perfil-produto.module#PerfilProdutoPageModule' },
  { path: 'list-produto', loadChildren: './pages/list-produto/list-produto.module#ListProdutoPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
