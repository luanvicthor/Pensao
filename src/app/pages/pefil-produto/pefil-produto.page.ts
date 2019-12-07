import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-pefil-produto',
  templateUrl: './pefil-produto.page.html',
  styleUrls: ['./pefil-produto.page.scss'],
})
export class PefilProdutoPage implements OnInit {

  private produto: Produto = new Produto
  private id: string;


  constructor(
    private produtoService: ProdutoService,
    private ativeRouter: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.ativeRouter.snapshot.paramMap.get("id")
    this.produtoService.get(this.id).subscribe(
      res => {
        this.produto = res
      }
    )
  }

}
