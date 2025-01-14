// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header({ menuOpen, setMenuOpen, onLoginOpen, isLoggedIn, onLogout }) {
    return (
        <header className="header">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <Link to="/" className="title-link">
                <h1 className="title">DisasterMaster</h1>
            </Link>

            {isLoggedIn ? (
                <button className="logout" onClick={onLogout}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
                    Log out
                </button>
            ) : (
                <button className="login" onClick={onLoginOpen}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
                    Log in
                </button>
            )}
        </header>
    );
}

export default Header;
