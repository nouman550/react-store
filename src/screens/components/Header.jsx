import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isScrolled, showHeader }) => {
  const [mobileNavMenu, setMobileNavMenu] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#1b1d1f",
      }}
    >
      <header
        id="mad-header"
        className={`mad-header ${isScrolled || mobileNavMenu ? "scrolled" : ""}
        ${showHeader ? "show-header" : "hide-header"}
        `}
      >
        <div className="mad-header-section--sticky-xl">
          <div className="mad-header-items">
            <nav className="mad-navigation-container">
              <div className={`menu-item ${"d-m-none-large"}`}>
                <Link to="/" className="mad-logo">
                  <img
                    src="images/header-logo.jpeg"
                    height={100}
                    style={{ borderRadius: "100%" }}
                    alt="logo"
                    onClick={() => setMobileNavMenu(false)}
                  />
                </Link>
              </div>
              <button
                className="mad-mobile-nav-btn"
                onClick={() => {
                  setMobileNavMenu(!mobileNavMenu);
                }}
              ></button>
              <ul
                className={`mad-navigation mad-navigation--vertical-sm  ${
                  mobileNavMenu === true ? "d-m-block" : "d-m-none"
                }`}
              >
                <li
                  onClick={() => setMobileNavMenu(false)}
                  className="menu-item"
                >
                  <Link to="/contact">Nous contacter</Link>
                </li>
                <li
                  className={`menu-item ${
                    !mobileNavMenu ? "d-m-block" : "d-m-none"
                  }`}
                >
                  <Link to="/" className="mad-logo">
                    <img
                      src="images/header-logo.jpeg"
                      height={100}
                      style={{ borderRadius: "100%" }}
                      alt="logo"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setMobileNavMenu(false)}
                  className="menu-item mega-menu"
                >
                  <Link to="/menu">Notre carte</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
