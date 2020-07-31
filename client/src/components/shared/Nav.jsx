import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Nav({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Data Center Ontario
      </Link>

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
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              href=""
              className="nav-link dropdown-toggle"
              id="datasDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Datas
            </a>
            <div className="dropdown-menu" aria-labelledby="datasDropdown">
              <Link to="/datas" className="dropdown-item">
                Archive
              </Link>
              {user ? (
                <Fragment>
                  {" "}
                  <div className="dropdown-divider"> </div>{" "}
                  <Link to="datas/new" className="dropdown-item">
                    New Post
                  </Link>{" "}
                </Fragment>
              ) : null}
            </div>
          </li>
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <i className="fa fa-sign-out"></i>
                  Logout
                </Link>
              </li>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <i className="fa fa-user-plus"></i>
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fa fa-sign-in"></i>
                    Login
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
