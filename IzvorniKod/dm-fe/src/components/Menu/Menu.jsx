import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu({closeMenu}) {
  return (
    <div className="menu">
      <Link to="/safety-measures" onClick={closeMenu}>
        <button>Safety Measures</button>
      </Link>
      <Link to="/nearest-shelters" onClick={closeMenu}>
        <button>Nearest Shelters</button>
      </Link>
      <Link to="/available-resources" onClick={closeMenu}>
        <button>Available Resources</button>
      </Link>
    </div>
  );
}

export default Menu;
