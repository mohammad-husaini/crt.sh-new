import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="top-left">
      <Link to="/">
        <span className="logo-design">CYSTACK</span>
      </Link>
    </div>
  );
};

export default Logo;
