import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { purchaseTicket } from "../services/ticketService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function EventDetails() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [error, setError] = useState("");

    const [ticket, setTicket] = useState(null);
    const [booking, setBooking] = useState(false);
    const [bookingError, setBookingError] = useState("");


    // Get event details
    useEffect(() => {

        fetch(`http://localhost:8080/api/events/${id}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error("Event not found");
                }

                return response.json();
            })
            .then(data => setEvent(data))
            .catch(error => setError(error.message));

    }, [id]);


    // Book ticket
    async function handleBooking() {

        try {

            setBooking(true);
            setBookingError("");

            // Temporary attendee ID
            const attendeeId = 101;

            const newTicket = await purchaseTicket(
                id,
                attendeeId
            );

            setTicket(newTicket);

            // Update available tickets on the page
            setEvent(previousEvent => ({
                ...previousEvent,
                availableTickets:
                    previousEvent.availableTickets - 1
            }));

        } catch (error) {

            setBookingError(error.message);

        } finally {

            setBooking(false);
        }
    }


    // Download ticket as PDF
    async function downloadTicket() {

        const ticketElement = document.getElementById("ticket");

        if (!ticketElement) {
            return;
        }

        try {

            const canvas = await html2canvas(ticketElement, {
                scale: 2,
                backgroundColor: "#12151d"
            });

            const imageData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pageWidth =
                pdf.internal.pageSize.getWidth();

            const imageWidth = 170;

            const imageHeight =
                (canvas.height * imageWidth) /
                canvas.width;

            const x =
                (pageWidth - imageWidth) / 2;

            pdf.addImage(
                imageData,
                "PNG",
                x,
                20,
                imageWidth,
                imageHeight
            );

            pdf.save(
                `${ticket.ticketNumber}.pdf`
            );

        } catch (error) {

            console.error(
                "Failed to generate PDF:",
                error
            );

        }
    }


    // Event not found
    if (error) {

        return (
            <div className="details-page">

                <h2>
                    ⚠ {error}
                </h2>

                <Link
                    to="/"
                    className="back-link"
                >
                    ← Back to Events
                </Link>

            </div>
        );
    }


    // Loading
    if (!event) {

        return (
            <div className="details-page">
                <p>Loading event...</p>
            </div>
        );
    }


    return (
        <section className="details-page">

            <Link
                to="/"
                className="back-link"
            >
                ← Back to Events
            </Link>


            <div className="details-card">

                {/* Event Image */}
                <div className="details-image">

                    <span>
                        EVENT
                    </span>

                </div>


                {/* Event Information */}
                <div className="details-content">

                    <p className="section-label">
                        UPCOMING EVENT
                    </p>


                    <h1>
                        {event.name}
                    </h1>


                    <p className="details-description">
                        {event.description}
                    </p>


                    {/* Event Information */}
                    <div className="details-info">

                        <div>

                            <span>
                                📍
                            </span>

                            <div>

                                <small>
                                    Location
                                </small>

                                <strong>
                                    {event.location}
                                </strong>

                            </div>

                        </div>


                        <div>

                            <span>
                                📅
                            </span>

                            <div>

                                <small>
                                    Date
                                </small>

                                <strong>
                                    {new Date(event.date)
                                        .toLocaleString()}
                                </strong>

                            </div>

                        </div>


                        <div>

                            <span>
                                🎟
                            </span>

                            <div>

                                <small>
                                    Tickets Available
                                </small>

                                <strong>
                                    {event.availableTickets}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* Booking Error */}
                    {bookingError && (

                        <div className="error">
                            ⚠ {bookingError}
                        </div>

                    )}


                    {/* Before Booking */}
                    {!ticket ? (

                        <button
                            className="primary-btn book-btn"
                            onClick={handleBooking}
                            disabled={
                                booking ||
                                event.availableTickets <= 0
                            }
                        >

                            {booking
                                ? "Booking..."
                                : event.availableTickets <= 0
                                    ? "Sold Out"
                                    : "Book Ticket →"
                            }

                        </button>

                    ) : (

                        /* After Booking */
                        <div
                            className="ticket-success"
                            id="ticket"
                        >

                            <h2>
                                🎉 Ticket Booked!
                            </h2>


                            <p>
                                Your ticket has been
                                successfully booked.
                            </p>


                            {/* QR Code */}
                            <div className="qr-container">

                                <QRCodeCanvas
                                    value={ticket.qrCode}
                                    size={220}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                />

                            </div>


                            {/* Ticket Number */}
                            <div className="ticket-number">

                                {ticket.ticketNumber}

                            </div>


                            {/* Ticket Status */}
                            <p>
                                Status:

                                {" "}

                                <strong>
                                    {ticket.status}
                                </strong>

                            </p>


                            {/* Download PDF */}
                            <button
                                className="primary-btn download-btn"
                                onClick={downloadTicket}
                            >
                                ↓ Download Ticket PDF
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default EventDetails;