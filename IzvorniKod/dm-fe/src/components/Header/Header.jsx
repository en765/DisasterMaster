import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header({ menuOpen, setMenuOpen, onLoginOpen, onRegisterOpen }) {
    return (
        <header className="header">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <Link to="/" className="title-link">
                <h1 className="title">DisasterMaster</h1>
            </Link>


            <div className="auth-buttons">
                <button className="login" onClick={onLoginOpen}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
                    Log in
                </button>


                <button className="register" onClick={onRegisterOpen}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
                    Register
                </button>
            </div>
        </header>
    );
}

export default Header;
