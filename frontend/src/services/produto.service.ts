import { Injectable } from "@angular/core";
import { ProdutoModel } from "../models/produto.model";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService extends BaseService<ProdutoModel> {
    protected override modulo: String = "produtos";

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}