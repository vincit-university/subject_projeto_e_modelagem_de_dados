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

import com.sisvendas.sisvendas.models.Pedido;
import com.sisvendas.sisvendas.service.PedidoService;

@RestController
@RequestMapping("pedidos")
public class PedidoController {
    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> get() {
        List<Pedido> result = pedidoService.RetornarTodos();
        return result;
    }

    @GetMapping("{id}")
    public Pedido get(@PathVariable long id) {
        Pedido result = pedidoService.RetornarPorId(id);
        return result;
    }
    
    @PostMapping
    public Pedido post(@RequestBody Pedido pedido) {
        Pedido result = pedidoService.Adicionar(pedido);
        return result;
    }

    @PutMapping("{id}")
    public Pedido put(@PathVariable long id, @RequestBody Pedido pedido) {
        Pedido result = pedidoService.Atualizar(id, pedido);
        return result;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        pedidoService.Excluir(id);
    }
}
