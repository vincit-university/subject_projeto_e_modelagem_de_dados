package com.sisvendas.sisvendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisvendas.sisvendas.models.Cliente;

public interface IClienteRepository 
    extends JpaRepository<Cliente, Long> {
    
}
