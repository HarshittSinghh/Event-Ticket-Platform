const API_URL = "http://localhost:8080/api/events";


export async function getEvents() {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch events");
    }

    return response.json();
}


export async function deleteEvent(eventId) {

    const response = await fetch(
        `${API_URL}/${eventId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete event");
    }
}