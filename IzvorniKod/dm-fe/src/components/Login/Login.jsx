import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

export default function LoginForm({ handleLoginClose }) {
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
    } catch (error) {
      console.error("Error during traditional login:", error);
    }
  };

  const handleLoginSuccess = async (response) => {
    console.log("Google login successful:", response);
    const token = response.credential;
    try {
      const res = await fetch("http://localhost:8080/oauth2/success", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.text();
      console.log("Google OAuth Response:", data);
      alert(`Google Login Successful! Welcome, ${data}`);
    } catch (error) {
      console.error("Error during Google OAuth login:", error);
    }
  };

  const handleLoginError = (error) => {
    console.error("Google login error:", error);
    alert("Google Login Failed!");
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
          <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
          />
        </div>
      </div>
  );
}
