import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../store/action/index";
import "./Navbar.css";

const Navbar = (props) => {
  const [header, setHeader] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setHeader(true) : setHeader(false);
    });
    return () => {
      const removeFunc = () => {};
      window.removeEventListener("scroll", removeFunc);
    };
  }, []);

  const logout = () => {
    props.logout();
    history.push("/auth");
  };

  return (
    <div className={`nav-container ${header && "nav-bg"}`}>
      <div className="nav-contents">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
          alt="Netflix Logo"
          onClick={() => history.push("/")}
        />
        {props.email ? (
          <>
            <h4 className="welcome-txt">Welcome {props.email}!</h4>
            <button className="login-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={() => history.push("/auth")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authReducer }) => ({
  email: authReducer?.authData?.email,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(action.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
