import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PefilUsuarioPage } from './pefil-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PefilUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PefilUsuarioPage]
})
export class PefilUsuarioPageModule {}
