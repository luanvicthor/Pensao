import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firedb: AngularFireDatabase
  ) { }

  add(usuario: Usuario) {
    //return this.firedb.object("usuarios").set(usuario);
    return this.firedb.list("usuarios").push(usuario);
  }

}
