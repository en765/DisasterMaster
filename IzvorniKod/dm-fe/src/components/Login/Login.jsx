// Login.jsx
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

export default function LoginForm({ handleLoginClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      console.log("Traditional Login Response:", data);
      alert(data);
      onLoginSuccess(); // Trigger login state change
    } catch (error) {
      console.error("Error during traditional login:", error);
    }
  };

  // Redirect user to the backend for Google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <div className="username-login">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password-login">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button className="submit-login" type="submit">
            Login
          </button>
          <button onClick={handleLoginClose} className="close-button">
            Close
          </button>
        </div>
      </form>

      <div className="google-login-button">
        <button onClick={handleGoogleLogin} className="google-button">
          Login with Google
        </button>
      </div>
    </div>
  );
}
