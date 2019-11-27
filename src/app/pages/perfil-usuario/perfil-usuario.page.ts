import { Router } from '@angular/router';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  protected usuario:Usuario = new Usuario;

  constructor(
    protected UsuarioService: UsuarioService,
    private router:Router
    
  ) { }
    

  ngOnInit() { }

  ionViewWillEnter(){
   let login =this.UsuarioService.afAuth.auth.currentUser
   if(login){
     this.UsuarioService.get().subscribe(
      res => {
        if (res == null){
          this.usuario = new Usuario
        } else{
          this.usuario = res
        }
        this.usuario.email = login.email
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
    this.UsuarioService.logout()
    this.router.navigate(["/"])
  }

  }
