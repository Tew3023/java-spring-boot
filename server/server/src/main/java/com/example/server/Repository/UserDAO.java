package com.example.server.Repository;

import com.example.server.Entity.User;
import org.springframework.stereotype.Repository;

public interface UserDAO {
    void save(User user);
    User findByEmail(String email);
}
