package com.example.server.Controller;

import com.example.server.Entity.User;
import com.example.server.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public String login(@RequestBody User user){
      User exitingUser = userRepository.findByEmail(user.getEmail());
      if(exitingUser != null && passwordEncoder.matches(user.getPassword(), exitingUser.getPassword())){
          return "login successfully";
      }else{
          return "nothing dog";
      }
    }
}
