import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../components/Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", { name, email, password });
            alert(res.data.message);
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-heading">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    className="register-input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="register-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="register-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="register-button">Sign Up</button>
                <button 
                        type="button" 
                        className="login-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
            </form>
        </div>
    );
}

export default Register;
