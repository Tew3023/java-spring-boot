package com.example.server.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "customer")
    private String customer;

    @Column(name = "foodOrder")
    private String foodOrder;

    @Column(name = "orderPrice")
    private int orderPrice;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Order() {}

    // Updated constructor to include customer
    public Order(String customer, String foodOrder, int orderPrice) {
        this.customer = customer;
        this.foodOrder = foodOrder;
        this.orderPrice = orderPrice;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getFoodOrder() {
        return foodOrder;
    }

    public void setFoodOrder(String foodOrder) {
        this.foodOrder = foodOrder;
    }

    public int getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(int orderPrice) {
        this.orderPrice = orderPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customer='" + customer + '\'' +
                ", foodOrder='" + foodOrder + '\'' +
                ", orderPrice=" + orderPrice +
                ", createdAt=" + createdAt +
                '}';
    }
}
