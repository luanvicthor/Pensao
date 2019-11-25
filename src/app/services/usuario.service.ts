import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firedb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  add(usuario: Usuario) {
    //Cria uma nova autenticação do usuario com email e senha;
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.pws).then(
      res => {
        //Apaga o email e a senha(pws) do usurio antes de gravar no banco;
        usuario.pws = null;
        usuario.email = null;
        //Grava no banco os dados do usuario com a chave da autenticação;
        return this.firedb.object("usuarios/" + res.user.uid).set(usuario).then().catch(
          () => {
            //Apaga o usuario conectado na autenticação
            this.afAuth.auth.currentUser.delete();
          });
      },
      erro => {
        //Apaga o usuario conectado na autenticação
        this.afAuth.auth.currentUser.delete();
      }
    )
    //return this.firedb.object("usuarios").set(usuario);
    //return this.firedb.list("usuarios").push(usuario);
  }

  get() {
    let user = this.afAuth.auth.currentUser;
    //console.log(user);
    return this.firedb.object<Usuario>("usuarios/" + user.uid).valueChanges();
  }

  update(usuario: Usuario) {
    let user = this.afAuth.auth.currentUser;
    return this.firedb.object("usuarios/" + user.uid).update(usuario);
  }

  delete() {
    let uid = this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.delete();
    return this.firedb.object("usuarios/" + uid).update({
      ativo: false
    });
    //return this.firedb.object("usuarios/" + uid).remove();
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
