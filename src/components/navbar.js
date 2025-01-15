import React from "react";
import MainLogo from "./MainLogo";
import "../cssFiles/navbar.css";
import gitcat from "../images/gitcat.png";

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
        <a
          href="https://github.com/SyedAbdullahHashmi0818/RBDG"
          target="_blank"
          rel="noopener noreferrer"
          id="gitCatAnchor"
        >
          <img src={gitcat} alt="img" id="gitCatNav" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
