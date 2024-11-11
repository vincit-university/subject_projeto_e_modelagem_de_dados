import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './produtos/produtos-form/produtos-form.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { PedidosFormComponent } from './pedidos/pedidos-form/pedidos-form.component';

const routes: Routes = [{
  path: 'clientes',
  children: [
    { path: '', component: ClientesListComponent },
    { path: 'incluir', component: ClientesFormComponent },
    { path: ':id', component: ClientesFormComponent }
  ]
},
{
  path: 'produtos',
  children: [
    { path: '', component: ProdutosListComponent },
    { path: 'incluir', component: ProdutosFormComponent },
    { path: ':id', component: ProdutosFormComponent }
  ]
},
{
  path: 'pedidos',
  children: [
    { path: '', component: PedidosListComponent },
    { path: 'incluir', component: PedidosFormComponent },
    { path: ':id', component: PedidosFormComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
