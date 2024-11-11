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

import com.sisvendas.sisvendas.models.Cliente;
import com.sisvendas.sisvendas.service.ClienteService;

@RestController
@RequestMapping("clientes")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> get() {
        List<Cliente> result = clienteService.RetornarTodos();
        return result;
    }

    @GetMapping("{id}")
    public Cliente get(@PathVariable long id) {
        Cliente result = clienteService.RetornarPorId(id);
        return result;
    }
    
    @PostMapping
    public Cliente post(@RequestBody Cliente cliente) {
        Cliente result = clienteService.Adicionar(cliente);
        return result;
    }

    @PutMapping("{id}")
    public Cliente put(@PathVariable long id, @RequestBody Cliente cliente) {
        Cliente result = clienteService.Atualizar(id, cliente);
        return result;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        clienteService.Excluir(id);
    }
}
