package com.sisvendas.sisvendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisvendas.sisvendas.models.Produto;

public interface IProdutoRepository 
    extends JpaRepository<Produto, Long>{
    
}
