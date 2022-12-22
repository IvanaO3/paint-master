import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  
  return (
    <nav className="nav">
      <h2 className="site-title">Paint Master</h2>
      <ul className="left-side">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/board"}>Board</Link>
        </li>
        <button className="log-btn" onClick={logOut}>Log Out</button>
      </ul>
    </nav>
  );
};
