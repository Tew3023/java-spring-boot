package com.example.server.Controller;

import com.example.server.Entity.Food;
import com.example.server.Repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        return foodRepository.getAll();
    }

    @DeleteMapping("/{id}") // ✅ เพิ่ม {id} ในเส้นทาง
    public String deleteFood(@PathVariable Integer id){
        foodRepository.delete(id);
        return "delete successfully";
    }

    @PostMapping
    public String createFood(@RequestBody Food food){
        foodRepository.save(food);
        return "created food successfully";

    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFood(@PathVariable Integer id,@RequestBody Food food){
        Food exitingFood = foodRepository.findById(id);
        if(exitingFood != null){
            exitingFood.setFname(food.getFname());
            exitingFood.setPrice(food.getPrice());

            foodRepository.save(exitingFood);
            return ResponseEntity.ok("Update data successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found");
        }
    }
}
