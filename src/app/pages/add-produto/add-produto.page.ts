import { Produto } from './../../model/produto';
import { Component, OnInit } from '@angular/core';
import { MensagemService } from './../../services/mensagem.service';
import { Router } from '@angular/router';
import { ProdutoService } from './../../services/produto.service';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})
export class AddProdutoPage implements OnInit {

  protected produto: Produto = new Produto;

  constructor(
    private msg: MensagemService,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    //console.log(this.produto);
    this.msg.presentLoading()
    this.produtoService.add(this.produto).then(
      res => {
        //console.log("Enviado!", res);
        this.msg.dismissLoading()
        this.msg.presentAlert("OK, ok", "Enviado com sucesso!");
        this.produto = new Produto;
        form.reset();
        this.router.navigate(['']);
      },
      erro => {
        console.log("Erro:", erro);
        this.msg.dismissLoading()
        this.msg.presentAlert("Ops!", "Erro ao tentar Enviar a informação!\nVerifique os dados  já foi enviado!")
      }
    )
  }

}
