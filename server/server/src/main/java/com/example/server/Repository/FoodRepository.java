package com.example.server.Repository;

import com.example.server.Entity.Food;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FoodRepository implements FoodDAO{

    private EntityManager entityManager;

    public FoodRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public List<Food> getAll() {
        TypedQuery<Food> query = entityManager.createQuery("FROM Food",Food.class);
        return query.getResultList();
    }
}
