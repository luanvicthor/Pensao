import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.page.html',
  styleUrls: ['./list-produto.page.scss'],
})
export class ListProdutoPage implements OnInit {

  protected produtos: Produto[];
  protected lista: boolean = false

  constructor(
    private produtoService: ProdutoService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.produtoService.gelAll().subscribe(
      res => {
        this.produtos = res;
        console.log(res);
      }
    )
  }

  async remover(id) {
    const alert = await this.msg.alertController.create({
      header: 'Confirmar!',
      message: 'Deseja apagar o produto?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.msg.presentLoading()
            this.produtoService.delete(id).then(
              _ => this.msg.dismissLoading()
            )
          }
        },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    })
    await alert.present()
  }
}
