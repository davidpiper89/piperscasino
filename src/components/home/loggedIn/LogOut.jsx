import React from "react";
import { auth } from "../../../firebase";

const Logout = ({ setLoggedIn }) => {
  const handleLogout = () => {
    setLoggedIn(false);
    auth.signOut();
  };

  return (
    <div className="m-auto logoutBtn" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
