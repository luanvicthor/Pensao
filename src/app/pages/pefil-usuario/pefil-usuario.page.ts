import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-pefil-usuario',
  templateUrl: './pefil-usuario.page.html',
  styleUrls: ['./pefil-usuario.page.scss'],
})
export class PefilUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;

  constructor(
    protected usuarioService: UsuarioService,
    private router: Router,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let login = this.usuarioService.afAuth.auth.currentUser;
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
    this.usuarioService.logout()
    this.router.navigate(["/"])
  }
  
  localAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.usuario.lat = resp.coords.latitude
      this.usuario.lng = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
