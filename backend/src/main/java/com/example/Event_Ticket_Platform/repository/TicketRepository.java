package com.example.Event_Ticket_Platform.repository;

import com.example.Event_Ticket_Platform.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByTicketNumber(String ticketNumber);

}