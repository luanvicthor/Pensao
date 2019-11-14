import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.usuario); 
  }

}
