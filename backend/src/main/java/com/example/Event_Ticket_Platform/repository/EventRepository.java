package com.example.Event_Ticket_Platform.repository;

import com.example.Event_Ticket_Platform.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}