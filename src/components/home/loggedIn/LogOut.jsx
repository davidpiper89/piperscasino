import React from "react";
import { auth } from "../../../firebase";

const Logout = ({ setLoggedIn }) => {
  const handleLogout = () => {
    setLoggedIn(false);
    auth.signOut();
  };

  return (
    <button className="m-auto" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
