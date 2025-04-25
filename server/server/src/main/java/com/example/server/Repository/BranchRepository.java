package com.example.server.Repository;


import com.example.server.Entity.Branch;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BranchRepository implements BranchDAO {

    private EntityManager entityManager;

    public BranchRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }


    @Override
    public List<Branch> getAll() {
        return entityManager.createQuery("FROM Branch",Branch.class).getResultList();
    }

    @Override
    @Transactional
    public void save(Branch branch) {
        entityManager.persist(branch);
    }
}
