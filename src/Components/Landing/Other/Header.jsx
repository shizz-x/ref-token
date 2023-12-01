import React from "react";
import logo from "../../../Images/logo.svg";

export default function Header() {
  return (
    <header className="landing_header">
      <div className="landing_header-content">
        <div className="landing_header-logo">
          <img src={logo} alt="" />
        </div>
        <div className="landing_header-nav_links">
          <div className="landing_header-nav_link">Наша миссия</div>
          <div className="landing_header-nav_link">История</div>
          <div className="landing_header-nav_link">Наши преимущества</div>
          <div className="landing_header-nav_link">Роадмап</div>
        </div>
        <div className="mobile-landing_header-nav_links">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="12" height="2" fill="#19204E" />
            <rect x="2" y="7" width="12" height="2" fill="#19204E" />
            <rect x="2" y="12" width="9" height="2" fill="#19204E" />
          </svg>
          <div className="tooltip">
            <div className="landing_header-nav_link">Наша миссия</div>
            <div className="landing_header-nav_link">История</div>
            <div className="landing_header-nav_link">Наши преимущества</div>
            <div className="landing_header-nav_link">Роадмап</div>
          </div>
        </div>
      </div>
    </header>
  );
}
