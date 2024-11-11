import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProdutosFormComponent,
    ProdutosListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProdutosFormComponent,
    ProdutosListComponent
  ]
})
export class ProdutosModule { }
