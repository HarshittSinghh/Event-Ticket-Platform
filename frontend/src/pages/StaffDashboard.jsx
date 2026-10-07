import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    Html5Qrcode
} from "html5-qrcode";

import {
    validateTicket
} from "../services/ticketService";


function StaffDashboard() {

    const scannerRef = useRef(null);

    const [scanning, setScanning] = useState(false);

    const [scannedTicket, setScannedTicket] =
        useState("");

    const [validationResult, setValidationResult] =
        useState(null);

    const [validationError, setValidationError] =
        useState("");


    // =====================================================
    // START SCANNER
    // =====================================================

    async function startScanner() {

        setScannedTicket("");
        setValidationResult(null);
        setValidationError("");

        setScanning(true);


        // Wait for scanner element to appear
        setTimeout(async () => {

            const scanner =
                new Html5Qrcode("qr-reader");

            scannerRef.current = scanner;


            try {

                await scanner.start(

                    {
                        facingMode: "environment"
                    },

                    {
                        fps: 10,

                        qrbox: {
                            width: 250,
                            height: 250
                        }
                    },


                    // QR successfully scanned
                    async (decodedText) => {

                        console.log(
                            "QR Code:",
                            decodedText
                        );


                        // Stop camera
                        await stopScanner();


                        // Save scanned ticket
                        setScannedTicket(
                            decodedText
                        );


                        // Validate ticket
                        try {

                            setValidationError("");
                            setValidationResult(null);


                            const result =
                                await validateTicket(
                                    decodedText
                                );


                            setValidationResult(
                                result
                            );

                        } catch (error) {

                            console.error(
                                "Ticket validation error:",
                                error
                            );


                            setValidationResult(
                                null
                            );


                            /*
                             * Show backend error message.
                             *
                             * Example:
                             * "Ticket has already been used"
                             */

                            setValidationError(
                                error.message ||
                                "Ticket validation failed."
                            );

                        }

                    },


                    // Ignore QR scanning errors
                    () => {}

                );

            } catch (error) {

                console.error(
                    "Camera error:",
                    error
                );

                setScanning(false);

            }

        }, 100);
    }


    // =====================================================
    // STOP SCANNER
    // =====================================================

    async function stopScanner() {

        if (!scannerRef.current) {

            setScanning(false);

            return;
        }


        try {

            await scannerRef.current.stop();

            scannerRef.current.clear();

        } catch (error) {

            console.error(
                "Failed to stop scanner:",
                error
            );

        }


        scannerRef.current = null;

        setScanning(false);

    }


    // =====================================================
    // CLEANUP CAMERA
    // =====================================================

    useEffect(() => {

        return () => {

            if (scannerRef.current) {

                scannerRef.current
                    .stop()
                    .catch(() => {});

            }

        };

    }, []);


    // =====================================================
    // RESET
    // =====================================================

    function scanAnotherTicket() {

        setScannedTicket("");

        setValidationResult(null);

        setValidationError("");

    }


    return (

        <section className="staff-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="staff-header">

                <div>

                    <p className="section-label">
                        STAFF PORTAL
                    </p>


                    <h1>
                        Ticket Verification
                    </h1>


                    <p>
                        Scan attendee tickets and verify
                        their authenticity at the event entrance.
                    </p>

                </div>

            </div>


            {/* =================================================
                STAFF CARD
            ================================================= */}

            <div className="staff-card">


                {/* =================================================
                    START SCREEN
                ================================================= */}

                {!scanning &&
                    !scannedTicket && (

                        <>

                            <div className="scanner-icon">
                                📷
                            </div>


                            <h2>
                                Scan Ticket QR Code
                            </h2>


                            <p>
                                Use the camera to scan an
                                attendee's ticket QR code.
                            </p>


                            <button
                                className="primary-btn"
                                onClick={startScanner}
                            >
                                Start Scanner →
                            </button>

                        </>

                    )}


                {/* =================================================
                    SCANNER
                ================================================= */}

                {scanning && (

                    <div className="scanner-section">

                        <h2>
                            Scan QR Code
                        </h2>


                        <p>
                            Point the camera at the
                            attendee's QR code.
                        </p>


                        <div
                            id="qr-reader"
                            className="qr-reader"
                        >
                        </div>


                        <button
                            className="secondary-btn"
                            onClick={stopScanner}
                        >
                            Stop Scanner
                        </button>

                    </div>

                )}


                {/* =================================================
                    VALIDATION RESULT
                ================================================= */}

                {scannedTicket && (

                    <div className="scan-result">


                        {/* =================================================
                            VALID TICKET
                        ================================================= */}

                        {validationResult && (

                            <>

                                <div className="success-icon">
                                    ✓
                                </div>


                                <h2>
                                    Valid Ticket
                                </h2>


                                <p>
                                    Ticket has been
                                    successfully verified.
                                </p>


                                <div className="scanned-ticket">

                                    {
                                        validationResult.ticketNumber
                                    }

                                </div>


                                <p>

                                    Status:

                                    {" "}

                                    <strong>
                                        {
                                            validationResult.status
                                        }
                                    </strong>

                                </p>

                            </>

                        )}


                        {/* =================================================
                            INVALID / USED TICKET
                        ================================================= */}

                        {!validationResult && (

                            <>

                                <div className="error-icon">
                                    ✕
                                </div>


                                <h2>
                                    Ticket Rejected
                                </h2>


                                <p className="validation-error-message">

                                    {
                                        validationError ||
                                        "Ticket validation failed."
                                    }

                                </p>


                                <div className="scanned-ticket">

                                    {scannedTicket}

                                </div>

                            </>

                        )}


                        {/* =================================================
                            SCAN AGAIN
                        ================================================= */}

                        <button
                            className="primary-btn"
                            onClick={scanAnotherTicket}
                        >
                            Scan Another Ticket
                        </button>


                    </div>

                )}

            </div>

        </section>
    );
}


export default StaffDashboard;