import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.usuario);
    this.usuarioService.add(this.usuario).then(
      res=>{
        console.log("Cadastrado! ", res);
      },
      erro=>{
        console.log("Erro: ", erro);
      }
    )
  }

}
