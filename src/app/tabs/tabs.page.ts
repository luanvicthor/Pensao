import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected usuario: Usuario = new Usuario

  constructor(
    protected usuarioService: UsuarioService
  ) {
  }

  ionViewWillEnter() {
    let login = this.usuarioService.afAuth.auth.currentUser;
    console.log(login)
    if (login) {
      this.usuarioService.get().subscribe(
        res => {
          if (res == null) {
            this.usuario = new Usuario
            if (login.displayName != null) {
              this.usuario.foto = login.photoURL
              this.usuario.nome = login.displayName
            }
          } else {
            this.usuario = res
          }
          this.usuario.email = login.email
        }
      )
    }
  }

}
