import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.page.html',
  styleUrls: ['./list-produto.page.scss'],
})
export class ListProdutoPage implements OnInit {

  protected produtos: Produto[] = []
  protected lista: boolean = false

  constructor(
    private produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    this.produtoService.gelAll().subscribe(
      res => {
        this.produtos = res;
        console.log(res);
      }
    )
  }
}
