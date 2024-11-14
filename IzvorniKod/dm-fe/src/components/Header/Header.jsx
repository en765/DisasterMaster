import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header({ menuOpen, setMenuOpen, onLoginOpen }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>

this is current header
        ☰
      </button>

      <Link to="/" className="title-link">
        <h1 className="title">DisasterMaster</h1>
      </Link>

      <button className="login" onClick={onLoginOpen}>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
        Log in
      </button>
    </header>
  );
}


export default Header;
