package com.sisvendas.sisvendas.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.sisvendas.sisvendas.models.Pedido;
import com.sisvendas.sisvendas.models.PedidoProduto;
import com.sisvendas.sisvendas.repositories.IPedidoRepository;

@Service
public class PedidoService 
    extends BaseService<Pedido, IPedidoRepository> {
    
    @Override
    public Pedido Adicionar(Pedido entity) {
        List<PedidoProduto> pedidoProduto =
            entity.getPedidoProdutos();
        pedidoProduto.forEach(pp -> pp.setPedido(entity));
        return super.Adicionar(entity);
    }

    @Override
    public Pedido Atualizar(long id, Pedido entity) {
        List<PedidoProduto> pedidoProduto =
            entity.getPedidoProdutos();
        pedidoProduto.forEach(pp -> pp.setPedido(entity));
        return super.Atualizar(id, entity);
    }
}
