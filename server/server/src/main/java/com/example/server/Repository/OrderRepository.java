package com.example.server.Repository;

import com.example.server.Entity.Order;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepository implements OrderDAO{
    private EntityManager entityManager;

    public OrderRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Order order) {
        System.out.println("Persisting order: " + order);
        entityManager.persist(order);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Order order = entityManager.find(Order.class,id);
        entityManager.remove(order);
    }

    @Override
    public List<Order> getAll() {
        return entityManager.createQuery("FROM Order", Order.class).getResultList();
    }
}
