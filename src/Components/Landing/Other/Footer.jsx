import React from "react";
import logo from "../../../Images/logo.svg";
import inst from "../../../Images/instagram.png";
import face from "../../../Images/facebook.png";
import tg from "../../../Images/tg.svg";
import medium from "../../../Images/medium.png";

export default function Footer() {
  return (
    <footer className="landing_footer">
      <div className="landing_footer-content">
        <div className="landing_header-logo">
          <img src={logo} alt="" />
        </div>
        <h1>JOIN NOW!</h1>
        <div className="landing_footer-ex_links">
          <img src={tg} alt="" />
          <img src={face} alt="" />
          <img src={inst} alt="" />
          <img src={medium} alt="" />
        </div>
      </div>
    </footer>
  );
}
