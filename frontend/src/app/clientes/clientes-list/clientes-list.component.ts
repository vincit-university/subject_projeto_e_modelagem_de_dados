import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteModel } from '../../../models/cliente.model';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {
  clientes: ClienteModel[] = [];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.obterClientes();
  }

  obterClientes() {
    let resposta = this.clienteService.retornarTodos();
    
    resposta.subscribe({
      next: value => this.clientes = value,
      error: erro => alert('falha na conexão!')
    })
  }

  excluir(cliente: ClienteModel) {
    let confirma = confirm("Deseja confirmar a exclusão?");

    if (confirma) {
      let id = Number(cliente.id);
      let resposta = this.clienteService.excluir(id);

      resposta.subscribe({
        next: () => this.obterClientes(),
        error: err => alert(err)
      });
    }
  }
}
