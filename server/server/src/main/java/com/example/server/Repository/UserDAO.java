package com.example.server.Repository;

import com.example.server.Entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserDAO {
    void save(User user);
    User findByEmail(String email);
    List<User> getAll();
    void updateUser(User user);
    void deleteUser(Integer id);
}
