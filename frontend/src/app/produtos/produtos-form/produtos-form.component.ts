import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.css'
})
export class ProdutosFormComponent implements OnInit {
  model : ProdutoModel = {};
  status: string = "";

  constructor(private route: Router,
              private activedRoute : ActivatedRoute,
              private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: parameters => {
        let id = Number(parameters.get('id'));
        this.obterProduto(id);
      }
    })
  }

  obterProduto(id : number) {
    if (id > 0) {
      let resposta = this.produtoService.retornarPorId(id);
      resposta.subscribe({
        next: value => this.model = value,
        error: err => alert(err)
      });
    }
  }

  salvar() {
    this.status = "Processando ...";

    let id = Number(this.model.id);
    let resposta: Observable<ProdutoModel>;

    if (id > 0) {
      resposta = this.produtoService.atualizar(id, this.model);
    } else {
      resposta = this.produtoService.adicionar(this.model);
    }

    resposta.subscribe({
      next: value => {
        this.obterProduto(Number(value.id));
        this.status = "Salvo com sucesso!";
        setTimeout(() => this.route.navigate(['/produtos', value.id]), 5000);
      },
      error: err => alert(err)
    })

  }
}
