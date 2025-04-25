package com.example.server.Entity;


import jakarta.persistence.*;

@Entity
@Table(name = "Branch")
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "BranchName")
    private String BranchName;

    public Branch () {

    }

    public Branch(String branchName) {
        BranchName = branchName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBranchName() {
        return BranchName;
    }

    public void setBranchName(String branchName) {
        BranchName = branchName;
    }

    @Override
    public String toString() {
        return "Branch{" +
                "id=" + id +
                ", BranchName='" + BranchName + '\'' +
                '}';
    }
}
