package com.example.Event_Ticket_Platform.service;

import com.example.Event_Ticket_Platform.entity.User;
import com.example.Event_Ticket_Platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}