package com.example.server.Repository;

import com.example.server.Entity.Message;

import java.util.List;

public interface MessageDAO  {
    void save(Message message);
    List<Message> getAll();
}
