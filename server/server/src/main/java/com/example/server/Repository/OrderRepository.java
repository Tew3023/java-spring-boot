package com.example.server.Repository;

import com.example.server.Entity.Order;
import com.example.server.Entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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


    @Override
    @Transactional
    public void update(Order order) {
        entityManager.merge(order);
    }

    @Override
    public Order findById(Integer id) {
        return entityManager.find(Order.class,id);
    }

    @Override
    public List<Order> getDataByEmail(String customer) {
        String query = "SELECT o FROM Order o WHERE o.customer = :customer";
        try {
            return entityManager.createQuery(query, Order.class)
                    .setParameter("customer", customer)
                    .getResultList();
        } catch (NoResultException e) {
            return new ArrayList<>(); // คืนค่า empty list แทน null
        }
    }


}
