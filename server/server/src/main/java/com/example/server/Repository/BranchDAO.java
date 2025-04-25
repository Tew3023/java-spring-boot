package com.example.server.Repository;

import com.example.server.Entity.Branch;

import java.util.List;

public interface BranchDAO {
    List<Branch> getAll();
    void save(Branch branch);
}
