
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleLogin(e) {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            // Store JWT token
            localStorage.setItem("token", response.data.token);

            // Update global user state
            setUser(response.data.user);

            // Redirect to homepage
            navigate("/");

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>

            </form>

            <p>{message}</p>

            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;
