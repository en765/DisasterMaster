// Login.jsx
import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

export default function LoginForm({ handleLoginClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://server-dm.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userName = await fetchUserName();
        alert(`⁠ Welcome, ${userName}! ⁠`);
        onLoginSuccess(); // Notify the parent of login success
      } else {
        const error = await response.text();
        alert(error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }



    //   const data = await response.text();
    //   console.log("Traditional Login Response:", data);
    //   alert(data);
    //   onLoginSuccess(); // Trigger login state change
    // } catch (error) {
    //   console.error("Error during traditional login:", error);
    // }
  };

  // Redirect user to the backend for Google login
  const handleGoogleLogin = () => {
      const popup = window.open(
        "https://server-dm.onrender.com/oauth2/authorization/google",
        "GoogleLogin",
        "width=600,height=700"
      );

      // Poll the popup to check for closure
      const interval = setInterval(async () => {
        try {
          if (popup.closed) {
            clearInterval(interval); // Stop polling when popup is closed
            const userName = await fetchUserName();
            if (userName) {
              alert(`Welcome, ${userName}!`);
              onLoginSuccess(); // Notify the parent of login success
            }
          }
        } catch (err) {
          console.error("Error during popup polling:", err);
        }
      }, 1000);
    };


const fetchUserName = async () => {
  try {
    const response = await fetch("http://localhost:8080/login-success", {
      method: "GET",
      credentials: "include", // Ensure cookies are sent with the request
    });
    if (response.ok) {
      const userName = await response.text(); // Plain string response
      return userName;
    } else {
      console.error("Failed to fetch user details");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
  return null;
}


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
