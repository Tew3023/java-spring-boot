package com.example.server.Controller;

import com.example.server.Entity.Food;
import com.example.server.Entity.Order;
import com.example.server.Repository.OrderRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    private final OrderRepository orderRepository;
    @Autowired
    public OrderController(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

   @GetMapping
    public List<Order> getAll(){
        return  orderRepository.getAll();
   }

   @PostMapping
    public String createOrder(@RequestBody Order order){
       //System.out.println("Received order: " + order);
       orderRepository.save(order);
       return "order created successfully";
   }

   @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Integer id){
        orderRepository.delete(id);
       return "order deleted successfully";

   }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrder(@PathVariable Integer id,@RequestBody Order order){
        Order exitingOrder = orderRepository.findById(id);
        if(exitingOrder != null){
            exitingOrder.setFoodOrder(order.getFoodOrder());
            exitingOrder.setOrderPrice(order.getOrderPrice());
            exitingOrder.setQuantity(order.getQuantity());

            orderRepository.save(exitingOrder);
            return ResponseEntity.ok("Update data successfully");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found");
        }
    }

    @GetMapping("/myOrders")
    public ResponseEntity<List<Order>> getOrderByEmail(@CookieValue(value = "userEmail", defaultValue = "") String userEmail) {
        if (userEmail.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList()); // []
        }

        List<Order> orders = orderRepository.getDataByEmail(userEmail);

        if (orders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orders);
        }

        return ResponseEntity.ok(orders);
    }





}
