package com.example.server.Controller;

import com.example.server.Entity.Order;
import com.example.server.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
       System.out.println("Received order: " + order);
        orderRepository.save(order);
        return "order created successfully";
   }

   @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Integer id){
        orderRepository.delete(id);
       return "order deleted successfully";

   }



}
