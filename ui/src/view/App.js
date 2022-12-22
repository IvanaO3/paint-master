import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/navbar/Navbar";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn && <Navbar />}
      <Outlet />
    </React.Fragment>
  );
}
