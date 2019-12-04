import { Produto } from './../model/produto';

import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private firedb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  add(produto:Produto){
    // criar uma conta autenticação do usuario com email e senha;
    return this.afAuth.auth.createUserWithEmailAndPassword(produto.nome,produto.quant).then(
      res=>{
        // apaga o email a senha(pws) di usuario antes de gravar o banco;
        produto.nome= null;
        produto.quant= null;
        //grava no banco os dados do produto com a chave da autenticação
        return this.firedb.object("produto/"+ res.user.uid).set(produto).then().catch(()=>{this.afAuth.auth.currentUser.delete();});
        //({
          // nome: produto.nome,
          //  ativo:produto.ativo,
        //})
      },
      erro=>{
        // apaga o usuario conectado na autenticação
        this.afAuth.auth.currentUser.delete();
      }
    )
    //return this.firedb.object("produto/"+ id).set(produto);
    //return this.firedb.list("produto").push(produto);
  }
  get(){
    let user = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object<Produto>("produto/" + user.uid).valueChanges();
  }

  update(produto:Produto){
    let user = this.afAuth.auth.currentUser;
    return this.firedb.object("produto/" + user.uid).update(produto);
  }
  delete(){
    let uid = this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.delete();
    return this.firedb.object("produto/" + uid).update({ativo: false});
    //return this.firedb.object("produto/" + uid).remove();
  }
  logout(){
    this.afAuth.auth.signOut();
  }

}
