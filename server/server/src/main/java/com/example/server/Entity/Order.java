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

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "branch")
    private String branch;

    public Order() {
        // ค่า default สำหรับ paidStatus คือ false แล้วในตัวแปร
    }

    public Order(String customer, String foodOrder, int orderPrice, int quantity, String branch) {
        this.customer = customer;
        this.foodOrder = foodOrder;
        this.orderPrice = orderPrice;
        this.quantity = quantity;
        this.branch = branch;
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customer='" + customer + '\'' +
                ", foodOrder='" + foodOrder + '\'' +
                ", orderPrice=" + orderPrice +
                ", quantity=" + quantity +
                ", createdAt=" + createdAt +
                ", branch='" + branch + '\'' +
                '}';
    }
}
