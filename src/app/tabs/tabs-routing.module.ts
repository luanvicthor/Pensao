import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'googlemaps',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../googlemaps/googlemaps.module').then(m => m.GooglemapsPageModule)
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
              import('../pages/perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule)
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
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
