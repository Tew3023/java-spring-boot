package com.example.server.Repository;

import com.example.server.Entity.Food;

import java.util.List;

public interface FoodDAO  {
    List<Food> getAll();
    void delete(Integer id);
    void update(Food food);
    void save(Food food);
    Food findById(Integer id);

}
