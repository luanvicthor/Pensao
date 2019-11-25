import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    protected usuarioService: UsuarioService
  ) {
    console.log(this.usuarioService.afAuth.auth.currentUser)
    //console.log(this.usuarioService.afAuth.user)
  }

}
