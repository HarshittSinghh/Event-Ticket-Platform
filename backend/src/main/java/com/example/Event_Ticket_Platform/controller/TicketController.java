package com.example.Event_Ticket_Platform.controller;

import com.example.Event_Ticket_Platform.entity.Ticket;
import com.example.Event_Ticket_Platform.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;


    // Create ticket
    @PostMapping
    public ResponseEntity<Ticket> createTicket(
            @RequestBody Ticket ticket) {

        return ResponseEntity.ok(
                ticketService.createTicket(ticket)
        );
    }


    // Get all tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {

        return ResponseEntity.ok(
                ticketService.getAllTickets()
        );
    }


    // Get ticket by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.getTicketById(id)
        );
    }


    // Delete ticket
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(
            @PathVariable Long id) {

        ticketService.deleteTicket(id);

        return ResponseEntity.noContent().build();
    }


    // Purchase ticket
    @PostMapping("/purchase/{eventId}")
    public ResponseEntity<Ticket> purchaseTicket(
            @PathVariable Long eventId,
            @RequestParam Long attendeeId) {

        return ResponseEntity.ok(
                ticketService.purchaseTicket(
                        eventId,
                        attendeeId
                )
        );
    }


    // Validate ticket
    @PostMapping("/validate")
    public ResponseEntity<Ticket> validateTicket(
            @RequestParam String ticketNumber) {

        return ResponseEntity.ok(
                ticketService.validateTicket(
                        ticketNumber
                )
        );
    }
}