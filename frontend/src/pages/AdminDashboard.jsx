import { useEffect, useState } from "react";

import {
    getEvents,
    deleteEvent
} from "../services/eventService";


function AdminDashboard() {

    // =====================================================
    // CREATE EVENT STATES
    // =====================================================

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [totalTickets, setTotalTickets] = useState("");


    // =====================================================
    // GENERAL STATES
    // =====================================================

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // EVENT MANAGEMENT STATES
    // =====================================================

    const [events, setEvents] = useState([]);

    const [loadingEvents, setLoadingEvents] =
        useState(true);


    // =====================================================
    // LOAD EVENTS
    // =====================================================

    async function loadEvents() {

        try {

            setLoadingEvents(true);

            const data = await getEvents();

            setEvents(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoadingEvents(false);

        }
    }


    // =====================================================
    // LOAD EVENTS WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        loadEvents();

    }, []);


    // =====================================================
    // CREATE EVENT
    // =====================================================

    async function handleCreateEvent(event) {

        event.preventDefault();

        setMessage("");
        setMessageType("");

        setError("");

        setLoading(true);


        try {

            const response = await fetch(
                "http://localhost:8080/api/events",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        description: description,

                        location: location,

                        date: date,

                        totalTickets:
                            Number(totalTickets),

                        availableTickets:
                            Number(totalTickets)

                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to create event"
                );

            }


            await response.json();


            // Refresh event list
            await loadEvents();


            // Show success popup
            setMessage(
                "Event created successfully!"
            );

            setMessageType("created");


            // Clear form
            setName("");
            setDescription("");
            setLocation("");
            setDate("");
            setTotalTickets("");


            // Close popup after 3 seconds
            setTimeout(() => {

                setMessage("");
                setMessageType("");

            }, 3000);


        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    // =====================================================
    // DELETE EVENT
    // =====================================================

    async function handleDeleteEvent(eventId) {

        try {

            setError("");

            await deleteEvent(eventId);


            // Refresh event list
            await loadEvents();


            // Show success popup
            setMessage(
                "Event deleted successfully!"
            );

            setMessageType("deleted");


            // Close popup after 3 seconds
            setTimeout(() => {

                setMessage("");
                setMessageType("");

            }, 3000);


        } catch (error) {

            setError(error.message);

        }
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <section className="admin-page">


            {/* =================================================
                SUCCESS POPUP
            ================================================= */}

            {message && (

                <div className="success-overlay">

                    <div className="success-popup">


                        {/* Animated Check */}

                        <div className="success-check">

                            <svg
                                viewBox="0 0 52 52"
                                className="checkmark"
                            >

                                <circle
                                    className="check-circle"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                />

                                <path
                                    className="check-mark"
                                    fill="none"
                                    d="M14 27l7 7 17-17"
                                />

                            </svg>

                        </div>


                        {/* Popup Title */}

                        <h2>

                            {messageType === "deleted"
                                ? "Event Deleted!"
                                : "Event Created!"
                            }

                        </h2>


                        {/* Popup Description */}

                        <p>

                            {messageType === "deleted"
                                ? "The event has been successfully deleted."
                                : "Your event has been successfully created."
                            }

                        </p>

                    </div>

                </div>

            )}


            {/* =================================================
                ADMIN HEADER
            ================================================= */}

            <div className="admin-header">

                <div>

                    <p className="section-label">
                        ADMIN PORTAL
                    </p>


                    <h1>
                        Event Management
                    </h1>


                    <p>
                        Create and manage events on Evently.
                    </p>

                </div>

            </div>


            {/* =================================================
                CREATE EVENT
            ================================================= */}

            <div className="admin-card">

                <h2>
                    Create New Event
                </h2>


                <p className="admin-card-description">

                    Add a new event for attendees to discover
                    and book.

                </p>


                {/* Error */}

                {error && (

                    <div className="error">
                        ⚠ {error}
                    </div>

                )}


                {/* Form */}

                <form onSubmit={handleCreateEvent}>


                    {/* Event Name */}

                    <div className="form-group">

                        <label>
                            Event Name
                        </label>


                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Java Developer Conference"
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>


                        <textarea
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Describe your event..."
                            rows="4"
                            required
                        />

                    </div>


                    {/* Location */}

                    <div className="form-group">

                        <label>
                            Location
                        </label>


                        <input
                            type="text"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            placeholder="Delhi"
                            required
                        />

                    </div>


                    {/* Date */}

                    <div className="form-group">

                        <label>
                            Event Date
                        </label>


                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(event) =>
                                setDate(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Total Tickets */}

                    <div className="form-group">

                        <label>
                            Total Tickets
                        </label>


                        <input
                            type="number"
                            min="1"
                            value={totalTickets}
                            onChange={(event) =>
                                setTotalTickets(event.target.value)
                            }
                            placeholder="100"
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="primary-btn login-submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Event..."
                            : "Create Event →"
                        }

                    </button>

                </form>

            </div>


            {/* =================================================
                EVENT MANAGEMENT
            ================================================= */}

            <div className="admin-card event-management-card">

                <h2>
                    Manage Events
                </h2>


                <p className="admin-card-description">

                    View and manage all events.

                </p>


                {/* Loading */}

                {loadingEvents && (

                    <p>
                        Loading events...
                    </p>

                )}


                {/* No Events */}

                {!loadingEvents &&
                    events.length === 0 && (

                        <p>
                            No events created yet.
                        </p>

                    )}


                {/* Event List */}

                {!loadingEvents &&
                    events.length > 0 && (

                        <div className="admin-event-list">

                            {events.map((event) => (

                                <div
                                    className="admin-event-item"
                                    key={event.id}
                                >


                                    {/* Event Information */}

                                    <div className="admin-event-info">

                                        <h3>
                                            {event.name}
                                        </h3>


                                        <p>
                                            {event.location}
                                        </p>


                                        <p>

                                            Tickets:{" "}

                                            {
                                                event.availableTickets
                                            }

                                            {" / "}

                                            {
                                                event.totalTickets
                                            }

                                        </p>

                                    </div>


                                    {/* Delete Button */}

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDeleteEvent(
                                                event.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

            </div>

        </section>
    );
}


export default AdminDashboard;