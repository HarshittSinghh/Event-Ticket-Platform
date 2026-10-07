package com.example.Event_Ticket_Platform.controller;

import com.example.Event_Ticket_Platform.entity.User;
import com.example.Event_Ticket_Platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestParam String username,
            @RequestParam String password) {

        User user = userService.login(username, password);

        return ResponseEntity.ok(user);
    }
}