import { Component, OnInit } from '@angular/core';
import { PedidoModel } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrl: './pedidos-list.component.css'
})
export class PedidosListComponent implements OnInit{
  pedidos: PedidoModel[] = [];

  constructor(private pedidoService: PedidoService) {
  }
  
  ngOnInit(): void {
    this.obterPedidos();
  }

  obterPedidos() {
    let resposta = this.pedidoService.retornarTodos();

    resposta.subscribe({
      next: value => this.pedidos = value,
      error: err => alert(err)
    });
  }

  excluirPedido(pedido: PedidoModel) {
    let id = Number(pedido.id);
    let confirma = confirm("Deseja confirmar a exclusão?");

    if (confirma) {
      let resposta = this.pedidoService.excluir(id);

      resposta.subscribe({
        next: () => this.obterPedidos(),
        error: err => alert(err)
      });
    }
  }
}
