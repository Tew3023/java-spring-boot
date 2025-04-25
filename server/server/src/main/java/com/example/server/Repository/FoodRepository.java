package com.example.server.Repository;

import com.example.server.Entity.Food;
import com.example.server.Entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
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

    @Override
    @Transactional
    public void delete(Integer id) {
        Food food = entityManager.find(Food.class,id);
        entityManager.remove(food);
    }

    @Override
    @Transactional
    public void update(Food food) {
        entityManager.merge(food);
    }

    @Override
    @Transactional
    public void save(Food food) {
        System.out.println("Persisting food: " + food);
        entityManager.persist(food);
    }

    @Override
    public Food findById(Integer id) {
        return entityManager.find(Food.class,id);
    }


}
