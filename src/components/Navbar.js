import React, { useState, useEffect } from "react";

import "./Navbar.css";

const Navbar = () => {
  const [header, setHeader] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setHeader(true) : setHeader(false);
    });
    return () => {
      const removeFunc = () => {};
      window.removeEventListener("scroll", removeFunc);
    };
  }, []);

  return (
    <div className={`nav-container ${header && "nav-bg"}`}>
      <div className="nav-contents">
        <img
          class="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
          alt="Netflix Logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
