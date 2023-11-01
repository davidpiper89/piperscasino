import React from "react";
import { auth } from "../../firebase/firebase";
import defaultProfile from "../../assets/DefaultProfile.svg";
import { DEFAULT_RESULTS } from "../../config/config";

const Logout = ({
  setLoggedIn,
  setUsername,
  setChips,
  setAvatar,
  setWins,
  setLoses,
  setDraws,
  setUserAvatars,
}) => {
  const handleLogout = () => {
    setUsername("");
    setChips(null);
    setAvatar(defaultProfile);
    setWins(DEFAULT_RESULTS);
    setLoses(DEFAULT_RESULTS);
    setDraws(DEFAULT_RESULTS);
    setUserAvatars([]);

    localStorage.removeItem("username");
    localStorage.removeItem("chips");
    localStorage.removeItem("avatar");
    localStorage.removeItem("wins");
    localStorage.removeItem("loses");
    localStorage.removeItem("draws");
    localStorage.removeItem("avatars");
    localStorage.removeItem("loggedIn");

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
