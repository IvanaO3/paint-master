import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const logOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
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
        <button onClick={logOut}>Log Out</button>
      </ul>
    </nav>
  );
};
