package com.example.Event_Ticket_Platform.config;

import com.example.Event_Ticket_Platform.entity.User;
import com.example.Event_Ticket_Platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;

    @Bean
    public CommandLineRunner initializeUsers() {

        return args -> {

            // Create ADMIN
            if (userRepository.findByUsername("admin").isEmpty()) {

                User admin = new User();

                admin.setUsername("admin");
                admin.setPassword("admin123");
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
            }


            // Create STAFF
            if (userRepository.findByUsername("staff").isEmpty()) {

                User staff = new User();

                staff.setUsername("staff");
                staff.setPassword("staff123");
                staff.setRole(Role.STAFF);

                userRepository.save(staff);
            }
        };
    }
}