package com.sisvendas.sisvendas.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.processing.Find;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sisvendas.sisvendas.models.BaseModel;

public abstract class BaseService<TEntity extends BaseModel,
    IRepository extends JpaRepository<TEntity, Long>> {
    
    @Autowired
    private IRepository repository;

    public List<TEntity> RetornarTodos() {
        List<TEntity> result = repository.findAll();
        return result;
    }

    public TEntity RetornarPorId(long id) {
        Optional<TEntity> entity = repository.findById(id);
        TEntity result = entity != null ? entity.get() : null;
        return result;
    }

    public TEntity Adicionar(TEntity entity) {
        entity.setId(0);
        repository.save(entity);
        return entity;
    }

    public TEntity Atualizar(long id, TEntity entity) {
        entity.setId(id);
        repository.save(entity);
        return entity;

    }

    public void Excluir(long id) {
        TEntity entity = RetornarPorId(id);

        if (entity != null) {
            repository.delete(entity);
        }
    }
}
