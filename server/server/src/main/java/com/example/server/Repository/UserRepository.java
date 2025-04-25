package com.example.server.Repository;

import com.example.server.Entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository implements UserDAO{
    private EntityManager entityManager;

    public UserRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(User user) {
        System.out.println("Persisting user: " + user);
        entityManager.persist(user);
    }

    @Override
    public User findByEmail(String email) {
        String query = "SELECT u FROM User u WHERE u.email = :email";
        try {
            return entityManager.createQuery(query, User.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null; // ถ้าไม่เจอผู้ใช้
        }
    }

    @Override
    public List<User> getAll() {
        return entityManager.createQuery("FROM User",User.class).getResultList();
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    @Transactional
    public void deleteUser(Integer id) {
        User user = entityManager.find(User.class,id);
        entityManager.remove(user);
    }


}
