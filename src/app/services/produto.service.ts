import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private firedb: AngularFirestore
  ) { }

  add(produto: Produto) {
    return this.firedb.collection<Produto>("produtos").add(
      {
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: produto.categoria,
        valor: produto.valor,
        quant: produto.quant,
        fotos: produto.fotos,
        ativo: produto.ativo,
        lat: produto.lat,
        lng: produto.lng
      });
  }

  get(id) {
    return this.firedb.collection("produtos").doc<Produto>(id).valueChanges();
  }

  gelAll() {
    return this.firedb.collection<Produto>("produtos", ref => ref.where('ativo', '==', true)).snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
          //dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
  }

  update(produto: Produto, id: any) {
    return this.firedb.collection("produtos").doc<Produto>(id).update(produto);
  }

  delete(id: any) {
    return this.firedb.collection("produtos").doc<Produto>(id).update({
      ativo: false
    });
    //return this.firedb.collection("produtos").doc(id).remove();
  }

}
