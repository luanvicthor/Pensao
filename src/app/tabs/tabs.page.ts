import { Usuario } from './../model/usuario';
import { UsuarioService } from './../services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected usuario: Usuario = new Usuario

  constructor(
    protected UsuarioService:UsuarioService
  ) {
    console.log(this.UsuarioService.afAuth.auth.currentUser)
    //console.log(this.UsuarioService.afAuth.user)
  }
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
         
       },
       
      )
     
   }
 }

}
