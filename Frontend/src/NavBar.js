import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => (
  <div className="container">
    <nav className="navbar navbar-expand-md navbar-light">
      <span className="navbar-brand " id="brand">
        Todo App
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="Features"></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/Pricing"></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reasorces"></Link>
          </li>
        </ul>

        {sessionStorage.getItem('token').length>0 ? 
          <ul className="nav nav-bar navbar-right">
            <li className="nav-item">
              <Link className="nav-link" id="login" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-info"
                id="signup"
                onClick={() => {
                  sessionStorage.clear()
                }}
                to="/login"
              >
                Logout
              </Link>
            </li>
          </ul>
         : (
          <ul className="nav nav-bar navbar-right">
            <li className="nav-item">
              <Link className="nav-link" id="login" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-info" id="signup" to="/signup">
                SignUp
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  </div>
);

export default NavBar;
