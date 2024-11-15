import React, { useState } from "react";
import "./Login.css";

export default function LoginForm({ handleLoginClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
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
            <button className="submit-login" type="submit">Login</button>
            <button onClick={handleLoginClose} className="close-button">Close</button>
          </div>
        </form>
      </div>
  );
}
