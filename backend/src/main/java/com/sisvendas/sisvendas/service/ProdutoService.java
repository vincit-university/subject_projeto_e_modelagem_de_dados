package com.sisvendas.sisvendas.service;

import org.springframework.stereotype.Service;
import com.sisvendas.sisvendas.models.Produto;
import com.sisvendas.sisvendas.repositories.IProdutoRepository;

@Service
public class ProdutoService 
    extends BaseService<Produto, IProdutoRepository> {
    
}
