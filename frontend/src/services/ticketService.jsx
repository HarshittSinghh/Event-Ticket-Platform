const API_URL = "http://localhost:8080/api/tickets";


// =========================================================
// PURCHASE TICKET
// =========================================================

export async function purchaseTicket(
    eventId,
    attendeeId
) {

    const response = await fetch(
        `${API_URL}/purchase/${eventId}?attendeeId=${attendeeId}`,
        {
            method: "POST"
        }
    );


    if (!response.ok) {

        throw new Error(
            "Failed to purchase ticket"
        );
    }


    return response.json();
}


// =========================================================
// VALIDATE TICKET
// =========================================================

export async function validateTicket(
    ticketNumber
) {

    const response = await fetch(
        `${API_URL}/validate?ticketNumber=${encodeURIComponent(ticketNumber)}`,
        {
            method: "POST"
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Ticket validation failed"
        );
    }


    return data;
}