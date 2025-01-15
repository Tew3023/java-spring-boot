package com.example.server.Controller;

import com.example.server.Entity.User;
import com.example.server.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public String createUser(@RequestBody User user){
        String endcodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(endcodedPassword);
        userRepository.save(user);
        return "user created successfully";
    }
}
