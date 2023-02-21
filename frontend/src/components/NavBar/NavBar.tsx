import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = (props: any) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>
          {props.isLoggedIn ? (
            <li>
              <button onClick={props.handleLogout}>Déconnexion</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/character">Create account</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
