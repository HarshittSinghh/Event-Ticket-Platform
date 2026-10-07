package com.example.Event_Ticket_Platform.service;

import com.example.Event_Ticket_Platform.entity.Event;
import com.example.Event_Ticket_Platform.entity.Ticket;
import com.example.Event_Ticket_Platform.repository.EventRepository;
import com.example.Event_Ticket_Platform.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;


    // Create ticket
    public Ticket createTicket(Ticket ticket) {

        return ticketRepository.save(ticket);
    }


    // Get all tickets
    public List<Ticket> getAllTickets() {

        return ticketRepository.findAll();
    }


    // Get ticket by ID
    public Ticket getTicketById(Long id) {

        return ticketRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found")
                );
    }


    // Delete ticket
    public void deleteTicket(Long id) {

        ticketRepository.deleteById(id);
    }


    // Purchase ticket
    @Transactional
    public Ticket purchaseTicket(
            Long eventId,
            Long attendeeId) {

        // Find event
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found")
                );


        // Check availability
        if (event.getAvailableTickets() <= 0) {

            throw new RuntimeException(
                    "No tickets available"
            );
        }


        // Create ticket
        Ticket ticket = new Ticket();

        ticket.setEventId(eventId);

        ticket.setAttendeeId(attendeeId);


        // Generate ticket number
        String ticketNumber =
                "TKT-" + System.currentTimeMillis();

        ticket.setTicketNumber(ticketNumber);


        // Ticket is active
        ticket.setStatus("ACTIVE");


        // QR contains ticket number
        ticket.setQrCode(ticketNumber);


        // Decrease available tickets
        event.setAvailableTickets(
                event.getAvailableTickets() - 1
        );


        // Save event
        eventRepository.save(event);


        // Save ticket
        return ticketRepository.save(ticket);
    }


    // Validate ticket
    public Ticket validateTicket(String ticketNumber) {

        // Find ticket
        Ticket ticket = ticketRepository
                .findByTicketNumber(ticketNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid ticket"
                        )
                );


        // Already used
        if ("USED".equals(ticket.getStatus())) {

            throw new RuntimeException(
                    "Ticket has already been used"
            );
        }


        // Not active
        if (!"ACTIVE".equals(ticket.getStatus())) {

            throw new RuntimeException(
                    "Ticket is not active"
            );
        }


        // Mark ticket as used
        ticket.setStatus("USED");


        // Save updated ticket
        return ticketRepository.save(ticket);
    }
}