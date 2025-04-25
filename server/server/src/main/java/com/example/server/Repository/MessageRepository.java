package com.example.server.Repository;

import com.example.server.Entity.Message;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MessageRepository implements MessageDAO {

    private EntityManager entityManager;

    public MessageRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Message message) {
        entityManager.persist(message);

    }

    @Override
    public List<Message> getAll() {
        TypedQuery<Message> query = entityManager.createQuery("FROM Message",Message.class);
        return query.getResultList();
    }
}
