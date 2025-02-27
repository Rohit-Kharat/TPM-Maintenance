import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      alert("Login Successful!");
      localStorage.setItem("token", res.data.token); // Save token
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user info
      navigate("/form"); // Redirect to form page
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    
       <div className="login-container">
            <h2 className="login-heading">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    className="login-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
  );
}

export default Login;
