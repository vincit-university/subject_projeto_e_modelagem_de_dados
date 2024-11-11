import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../../services/pedido.service';
import { PedidoModel } from '../../../models/pedido.model';
import { ClienteModel } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { PedidoProdutoModel } from '../../../models/pedido-produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrl: './pedidos-form.component.css'
})
export class PedidosFormComponent implements OnInit{
  model: PedidoModel = {};
  produtoSelecionado?: ProdutoModel;
  produtoQuantidade: number = 0;
  status: string = "";
  clientes: ClienteModel[] = [];
  produtos: ProdutoModel[] = [];

	modalService = inject(NgbModal);

  constructor(private route: Router,
              private activedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private produtoService: ProdutoService) {
    
  }
  ngOnInit(): void {
   this.activedRoute.paramMap.subscribe({
    next: parameters => {
      let id = Number(parameters.get('id'));
      this.obterPedido(id);
    }
   })
  }

  obterPedido(id: number) {
    if (id > 0) {
      let resposta = this.pedidoService.retornarPorId(id);

      resposta.subscribe({
        next: value => {
          this.model = value;
          console.log(this.model)
        },
        error: err => alert(err)
      })
    }
  }

  salvarPedido() {
    this.status = "Processando ...";

    let id = Number(this.model.id);
    let resposta: Observable<PedidoModel>;

    if (id > 0) {
      resposta = this.pedidoService.atualizar(id, this.model);
    } else {
      this.model.dataEmissao = new Date();
      resposta = this.pedidoService.adicionar(this.model);
    }

    resposta.subscribe({
      next: value => {
        this.status = "Salvo com sucesso!";
        this.obterPedido(Number(value.id));
        setTimeout(() => this.route.navigate(['/pedidos', value.id]), 5000);
      }
    })
  }

	listarClientes(modalCliente: TemplateRef<any>) {
    let resposta = this.clienteService.retornarTodos();
    resposta.subscribe({
      next: value => this.clientes = value,
      error: err => alert(err)
    });

		this.modalService.open(modalCliente, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true }).result.then();
	}

	listarProdutos(modalProduto: TemplateRef<any>) {
    let resposta = this.produtoService.retornarTodos();
    resposta.subscribe({
      next: value => this.produtos = value,
      error: err => alert(err)
    });

		this.modalService.open(modalProduto, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true }).result.then();
	}

  selecionarCliente(cliente: ClienteModel, btnClienteClose: HTMLButtonElement) {
    this.model.cliente = cliente;
    btnClienteClose.click();
  }

  selecionarProduto(produto: ProdutoModel, btnProdutoClose: HTMLButtonElement) {
    this.produtoSelecionado = produto;
    btnProdutoClose.click();
  }

  incluirProduto() {
    if (!this.model.pedidoProdutos) {
      this.model.pedidoProdutos = [];
    }

    if (!this.produtoSelecionado) {
      alert("Nenhum produto selecionado!");
      return;
    }

    if (!(this.produtoQuantidade > 0)) {
      alert("Quantidade inválida!");
      return;
    }

    let pedidoProduto: PedidoProdutoModel = {
      produto: this.produtoSelecionado,
      quantidade: this.produtoQuantidade,
      totalitem: Number(this.produtoSelecionado.preco) * this.produtoQuantidade
    };

    this.model.pedidoProdutos.push(pedidoProduto);
    this.produtoSelecionado = undefined;
    this.produtoQuantidade = 0;
    this.atualizarTotalPedido();
  }

  atualizarTotalPedido() {
    let totalPedido: number = 0;

    this.model.pedidoProdutos?.forEach(pedidoProduto => {
      totalPedido += Number(pedidoProduto.totalitem);
    });

    this.model.totalPedido = totalPedido;
  }

  removerProduto(pedidoProduto: PedidoProdutoModel) {
    let indexOf = Number(this.model.pedidoProdutos?.indexOf(pedidoProduto));
    this.model.pedidoProdutos?.splice(indexOf, 1);
  }
}
