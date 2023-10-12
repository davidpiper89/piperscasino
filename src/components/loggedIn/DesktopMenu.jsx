import React from "react";
import { Link } from "react-router-dom";
import Logout from "./LogOut";

const DesktopMenu = ({setLoggedIn}) => {
  return (
    <div className="desktopMenu">
      <Link to="/profile">Profile</Link>
      <Link to="/store">Store</Link>
      <Logout setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default DesktopMenu;
