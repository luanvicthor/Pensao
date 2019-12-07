import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'listProdutos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-produto/list-produto.module').then(m => m.ListProdutoPageModule)
          }
        ]
      },
      {
        path: 'addProduto',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-produto/add-produto.module').then(m => m.AddProdutoPageModule)
          }
        ]
      },
      {
        path: 'perfilProduto/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/pefil-produto/pefil-produto.module').then(m => m.PefilProdutoPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'addUsuario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-usuario/add-usuario.module').then(m => m.AddUsuarioPageModule)
          }
        ]
      },
      {
        path: 'perfilUsuario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/pefil-usuario/pefil-usuario.module').then(m => m.PefilUsuarioPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/listProdutos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/listProdutos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
