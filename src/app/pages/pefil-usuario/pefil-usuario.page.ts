import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pefil-usuario',
  templateUrl: './pefil-usuario.page.html',
  styleUrls: ['./pefil-usuario.page.scss'],
})
export class PefilUsuarioPage implements OnInit {

  protected usuario: Usuario

  constructor(
    protected usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.usuarioService.afAuth.auth.currentUser) {
      this.usuarioService.get().subscribe(
        res => {
          this.usuario = res
          console.log(this.usuario)         
        },
        erro => {
          console.log(erro)
          this.router.navigate(['/login'])
        }
      )
    }
  }

  sair(){
    this.usuarioService.logout()
    this.router.navigate(["/"])
  }
}
