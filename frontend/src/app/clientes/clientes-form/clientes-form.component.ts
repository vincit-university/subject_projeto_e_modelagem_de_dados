import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit {
  model : ClienteModel = {};
  status: String = '';

  constructor(private route: Router,
              private activedRoute: ActivatedRoute,
              private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: parameters => {
        let id = Number(parameters.get('id'));
        this.obterCliente(id);
      }
    })
  }

  obterCliente(id: number) {
    if (id > 0) {
      let resposta = this.clienteService.retornarPorId(id);
      resposta.subscribe({
        next: cliente => this.model = cliente
      })
    }
  }

  salvarCliente() {
    this.status = 'Processando ...';

    let id = Number(this.model.id);
    let resposta: Observable<ClienteModel>;

    if (id > 0) {
      //Incluir
      resposta = this.clienteService.atualizar(id, this.model);
    } else {
      //Salvar
      resposta = this.clienteService.adicionar(this.model);
    }

    resposta.subscribe({
      next: value => {
        this.obterCliente(Number(value.id));
        this.status = "Salvo com sucesso!";
        setTimeout(() => this.route.navigate(['/clientes', value.id]), 5000);
      }
    })
  }
}
