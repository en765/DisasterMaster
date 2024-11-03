import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header({ menuOpen, setMenuOpen, onLoginOpen}) {
    return (
        <header className="header">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <h1 className="title">DisasterMaster</h1>
            <button className="login" onClick={onLoginOpen}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                Log in
            </button>
        </header>
    );
}

export default Header;
