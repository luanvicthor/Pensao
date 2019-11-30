import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private firedb: AngularFireDatabase,
  ) { }

  add(produto: Produto) {
    return this.firedb.list("produtos").add(produto);
  }

  get(id) {
    return this.firedb.object<Produto>("produtos/" + id).valueChanges();
  }

  update(produto: Produto, id: any) {
    return this.firedb.object("produtos/" + id).update(produto);
  }

  delete(id: any) {
    return this.firedb.object("produtos/" + id).update({
      ativo: false
    });
    //return this.firedb.object("produtos/" + id).remove();
  }

}
