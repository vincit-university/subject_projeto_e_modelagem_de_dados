package com.sisvendas.sisvendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sisvendas.sisvendas.models.Pedido;

public interface IPedidoRepository 
    extends JpaRepository<Pedido, Long> {
    
}
