package com.example.server.Controller;

import com.example.server.Entity.User;
import com.example.server.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/auth/me")
    public ResponseEntity<Map<String, Object>> getUserInfo(
            @CookieValue(value = "userEmail", defaultValue = "") String userEmail) {
        if (userEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not authenticated"));
        }
        return ResponseEntity.ok(Map.of("success", true, "email", userEmail));
    }

    @GetMapping
    public List<User> getAll(){
        return  userRepository.getAll();
    }

    @PutMapping
    public String updateUser(@RequestBody User user){
        userRepository.updateUser(user);
        return "updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id){
        userRepository.deleteUser(id);
        return "deleted successfully";
    }

}
