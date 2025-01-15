package com.example.server.Controller;

import com.example.server.Entity.Food;
import com.example.server.Repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/food")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {
    private final FoodRepository foodRepository;
    @Autowired
    public FoodController(FoodRepository foodRepository){
        this.foodRepository = foodRepository;
    }

    @GetMapping
    public List<Food> getAll(){
        return  foodRepository.getAll();
    }

}


