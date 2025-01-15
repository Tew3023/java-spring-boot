package com.example.server.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "foods")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "foodName")
    private String fname;

    @Column(name = "foodPrice")
    private int price;

    public Food(){

    }

    public Food(String fname, int price) {
        this.fname = fname;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Foods{" +
                "id=" + id +
                ", fname='" + fname + '\'' +
                ", price=" + price +
                '}';
    }
}
