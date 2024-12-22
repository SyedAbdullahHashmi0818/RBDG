import React from "react";
import MainLogo from "./MainLogo";
import "../cssFiles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <MainLogo />
        <a href="/" className="navbar-link hoverable-link">
          HOME
        </a>
        <a href="/uploadRequirements" className="navbar-link">
          GENERATE DIAGRAM
        </a>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <a href="/dummyPage" className="navbar-link">
          About
        </a>
        <button className="navbar-button">Toggle</button>
      </div>
    </nav>
  );
}

export default Navbar;
