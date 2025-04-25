package com.example.server.Controller;

import com.example.server.Entity.User;
import com.example.server.Repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("/deleteCookie")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // ลบ cookie userEmail
        Cookie userEmailCookie = new Cookie("userEmail", null);
        userEmailCookie.setPath("/"); // ต้อง set path ให้ตรงกับตอนสร้าง
        userEmailCookie.setHttpOnly(true);
        userEmailCookie.setSecure(true);
        userEmailCookie.setMaxAge(0); // 0 = ลบทันที

        // ลบ cookie userRole
        Cookie userRoleCookie = new Cookie("userRole", null);
        userRoleCookie.setPath("/"); // ต้อง set path ให้ตรงกับตอนสร้าง
        userRoleCookie.setHttpOnly(true);
        userRoleCookie.setSecure(true);
        userRoleCookie.setMaxAge(0); // 0 = ลบทันที

        // ส่ง cookie กลับไปให้ browser ลบ
        response.addCookie(userEmailCookie);
        response.addCookie(userRoleCookie);

        return ResponseEntity.ok("Cookies Deleted");
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user, HttpServletResponse response){
        User exitingUser = userRepository.findByEmail(user.getEmail());
        if(exitingUser != null && passwordEncoder.matches(user.getPassword(), exitingUser.getPassword())){
            Cookie userEmailCookie = new Cookie("userEmail", exitingUser.getEmail());
            Cookie userRoleCookie = new Cookie("userRole", exitingUser.getRole());

            // ตั้งค่า HttpOnly และ Secure
            userEmailCookie.setHttpOnly(true);  // ป้องกันการเข้าถึงจาก JavaScript
            userRoleCookie.setHttpOnly(true);

            userEmailCookie.setSecure(true);  // ใช้เฉพาะใน HTTPS
            userRoleCookie.setSecure(true);

            userEmailCookie.setMaxAge(60*60*24); // 1 วัน
            userRoleCookie.setMaxAge(60*60*24); // 1 วัน

            userEmailCookie.setPath("/");
            userRoleCookie.setPath("/");

            response.addCookie(userEmailCookie);
            response.addCookie(userRoleCookie);


            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("success",true);
            responseBody.put("email", exitingUser.getEmail());
            responseBody.put("role", exitingUser.getRole());


            return ResponseEntity.ok(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Invalid email or password"));
        }
    }

    @GetMapping("/profile")
    public String profile(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        String email = null;
        String role = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userEmail".equals(cookie.getName())) {
                    email = cookie.getValue();
                } else if ("userRole".equals(cookie.getName())) {
                    role = cookie.getValue();
                }
            }
        }

        if (email != null && role != null) {
            return "Welcome back, " + email + ". Your role is " + role;
        } else {
            return "No user logged in";
        }
    }

}
