package com.sisvendas.sisvendas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sisvendas.sisvendas.models.Produto;
import com.sisvendas.sisvendas.service.ProdutoService;

@RestController
@RequestMapping("produtos")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> get() {
        List<Produto> result = produtoService.RetornarTodos();
        return result;
    }

    @GetMapping("{id}")
    public Produto get(@PathVariable long id) {
        Produto result = produtoService.RetornarPorId(id);
        return result;
    }
    
    @PostMapping
    public Produto post(@RequestBody Produto produto) {
        Produto result = produtoService.Adicionar(produto);
        return result;
    }

    @PutMapping("{id}")
    public Produto put(@PathVariable long id, @RequestBody Produto produto) {
        Produto result = produtoService.Atualizar(id, produto);
        return result;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        produtoService.Excluir(id);
    }
}
