import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/eventService";

function Home() {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getEvents()
            .then(data => setEvents(data))
            .catch(error => setError(error.message));
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="hero">

                <div className="hero-content">

                    <p className="hero-tag">
                        ✨ EXPERIENCE SOMETHING GREAT
                    </p>

                    <h1>
                        Discover Your Next
                        <span> Unforgettable Event</span>
                    </h1>

                    <p className="hero-description">
                        Find exciting conferences, workshops and experiences.
                        Book your ticket and make memories that last.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            document
                                .getElementById("events")
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Explore Events →
                    </button>

                </div>

            </section>

            {/* Events */}
            <section className="events-section" id="events">

                <div className="section-header">

                    <div>
                        <p className="section-label">
                            DON'T MISS OUT
                        </p>

                        <h2>
                            Upcoming Events
                        </h2>
                    </div>

                    <p className="event-count">
                        {events.length} events available
                    </p>

                </div>

                {error && (
                    <div className="error">
                        ⚠ {error}
                    </div>
                )}

                <div className="event-grid">

                    {events.map(event => (

                        <div className="event-card" key={event.id}>

                            <div className="event-image">

                                <div className="event-category">
                                    EVENT
                                </div>

                                <div className="event-date">

                                    <strong>
                                        {new Date(event.date).getDate()}
                                    </strong>

                                    <span>
                                        {new Date(event.date)
                                            .toLocaleString("en-US", {
                                                month: "short"
                                            })}
                                    </span>

                                </div>

                            </div>

                            <div className="event-content">

                                <h3>
                                    {event.name}
                                </h3>

                                <p className="description">
                                    {event.description}
                                </p>

                                <div className="event-info">

                                    <span>
                                        📍 {event.location}
                                    </span>

                                    <span>
                                        🎟 {event.availableTickets} tickets
                                    </span>

                                </div>

                                <Link
                                    to={`/events/${event.id}`}
                                    className="view-btn"
                                >
                                    View Event →
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </section>
        </>
    );
}

export default Home;