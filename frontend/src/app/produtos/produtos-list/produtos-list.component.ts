import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrl: './produtos-list.component.css'
})
export class ProdutosListComponent implements OnInit{
  produtos: ProdutoModel[] = [];

  constructor(private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos() {
    let resposta = this.produtoService.retornarTodos();

    resposta.subscribe({
      next: value => this.produtos = value,
      error: err => console.log(err)
    });
  }

  excluir(produto: ProdutoModel) {
    let confirma = confirm("Deseja confirmar a exclusão?");

    if (confirma) {
      let id = Number(produto.id);
      let resposta = this.produtoService.excluir(id);

      resposta.subscribe({
        next: () => this.obterProdutos(),
        error: err =>  alert(err)
      })
    }
  }

}
