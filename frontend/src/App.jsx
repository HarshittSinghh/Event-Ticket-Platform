import { useEffect, useState } from "react";
import {
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";


function App() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    // Check if a user is already logged in
    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

    }, []);


    // Logout
    function handleLogout() {

        localStorage.removeItem("user");

        setUser(null);

        navigate("/");

    }


    return (

        <div className="app">


            {/* ================= NAVBAR ================= */}

            <nav className="navbar">


                {/* Logo */}

                <Link
                    to="/"
                    className="logo"
                >
                    🎟 Evently
                </Link>


                {/* Navigation */}

                <div className="nav-links">


                    {/* Events */}

                    <Link to="/">
                        Events
                    </Link>


                    {/* About */}

                    <a href="#about">
                        About
                    </a>


                    {/* ================= USER SECTION ================= */}

                    {user ? (

                        <>

                            {/* Logged-in role */}

                            <span className="user-role">
                                {user.role}
                            </span>


                            {/* ================= ADMIN ================= */}

                            {user.role === "ADMIN" && (

                                <Link to="/admin">
                                    Admin Dashboard
                                </Link>

                            )}


                            {/* ================= STAFF ================= */}

                            {user.role === "STAFF" && (

                                <Link to="/staff">
                                    Staff Dashboard
                                </Link>

                            )}


                            {/* Logout */}

                            <button
                                type="button"
                                className="login-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        /* ================= LOGGED OUT ================= */

                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>

                    )}

                </div>

            </nav>



            {/* ================= ROUTES ================= */}

            <Routes>


                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Event Details */}

                <Route
                    path="/events/:id"
                    element={<EventDetails />}
                />


                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Staff Dashboard */}

                <Route
                    path="/staff"
                    element={<StaffDashboard />}
                />


                {/* Admin Dashboard */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

            </Routes>



            {/* ================= FOOTER ================= */}

            <footer>

                <div className="logo">
                    🎟 Evently
                </div>


                <p>
                    Your gateway to unforgettable experiences.
                </p>


                <span>
                    © 2026 Evently
                </span>

            </footer>

        </div>

    );

}


export default App;