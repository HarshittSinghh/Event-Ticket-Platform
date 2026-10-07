import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    async function handleLogin(event) {

        event.preventDefault();

        try {

            setLoading(true);
            setError("");

            const user = await login(
                username,
                password
            );

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Redirect according to role
            if (user.role === "STAFF") {

                navigate("/staff");

            } else if (user.role === "ADMIN") {

                navigate("/admin");

            }

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }


    return (
        <section className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-icon">
                        🎟
                    </div>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to manage your Evently account.
                    </p>

                </div>


                {error && (
                    <div className="error">
                        ⚠ {error}
                    </div>
                )}


                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Enter username"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="primary-btn login-submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login →"
                        }

                    </button>

                </form>

            </div>

        </section>
    );
}

export default Login;