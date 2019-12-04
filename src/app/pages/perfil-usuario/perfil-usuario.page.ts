import { Router } from '@angular/router';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  protected usuario: Usuario = new Usuario;

  constructor(
    protected UsuarioService: UsuarioService,
    private router: Router,
    private geolocation: Geolocation

  ) { }


  ngOnInit() {

  }

  ionViewWillEnter() {
    let login = this.UsuarioService.afAuth.auth.currentUser
    if (login) {
      this.UsuarioService.get().subscribe(
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
          this.localAtual();
          console.log(this.usuario)
        },
        erro => {
          console.log(erro)
          this.router.navigate(['/login'])
        }
      )

    }
  }

  sair() {
    this.UsuarioService.logout()
    this.router.navigate(["/"])
  }
  localAtual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.usuario.lat = resp.coords.latitude
      this.usuario.lng = resp.coords.longitude

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
