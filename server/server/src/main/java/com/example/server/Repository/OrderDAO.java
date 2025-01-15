package com.example.server.Repository;


import com.example.server.Entity.Order;

import java.util.List;

public interface OrderDAO {
    void save(Order order);
    void delete(Integer id);
    List<Order> getAll();
}
