import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firedb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  add(usuario:Usuario){
    // criar uma conta autenticação do usuario com email e senha;
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.pws).then(
      res=>{
        // apaga o email a senha(pws) di usuario antes de gravar o banco;
        usuario.pws= null;
        usuario.email= null;
        //grava no banco os dados do usuario com a chave da autenticação
        return this.firedb.object("usuarios/"+ res.user.uid).set(usuario).then().catch(()=>{this.afAuth.auth.currentUser.delete();});
        //({
          // nome: usuario.nome,
          //  ativo:usuario.ativo,
        //})
      },
      erro=>{
        // apaga o usuario conectado na autenticação
        this.afAuth.auth.currentUser.delete();
      }
    )
    //return this.firedb.object("usuarios/"+ id).set(usuario);
    //return this.firedb.list("usuarios").push(usuario);
  }
  get(){
    let user = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object<Usuario>("usuarios/" + user.uid).valueChanges();
  }

  update(usuario:Usuario){
    let user = this.afAuth.auth.currentUser;
    return this.firedb.object("usuarios/" + user.uid).update(usuario);
  }
  delete(){
    let uid = this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.delete();
    return this.firedb.object("usuarios/" + uid).update({ativo: false});
    //return this.firedb.object("usuarios/" + uid).remove();
  }
  logout(){
    this.afAuth.auth.signOut();
  }

}
