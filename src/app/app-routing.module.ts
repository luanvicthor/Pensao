import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  // { path: 'add-usuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  // { path: 'add-produto', loadChildren: './pages/add-produto/add-produto.module#AddProdutoPageModule' },
  // { path: 'pefil-usuario', loadChildren: './pages/pefil-usuario/pefil-usuario.module#PefilUsuarioPageModule' },
  // { path: 'pefil-produto', loadChildren: './pages/pefil-produto/pefil-produto.module#PefilProdutoPageModule' },
  // { path: 'list-produto', loadChildren: './pages/list-produto/list-produto.module#ListProdutoPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
