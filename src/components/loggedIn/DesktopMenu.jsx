import React from "react";
import { Link } from "react-router-dom";
import Logout from "./LogOut";

const DesktopMenu = ({
  setLoggedIn,
  username,
  chips,
  setChips,
  avatar,
  setAvatar,
  setWins,
  setDraws,
  setLoses,
  setUserAvatars,
  setUsername,
}) => {
  return (
    <div className="desktopMenu">
      <Link to="/profile">Profile</Link>
      <Link to="/store">Store</Link>
      <Logout
        setLoggedIn={setLoggedIn}
        setChips={setChips}
        username={username}
        setUsername={setUsername}
        chips={chips}
        avatar={avatar}
        setAvatar={setAvatar}
        setWins={setWins}
        setDraws={setDraws}
        setLoses={setLoses}
        setUserAvatars={setUserAvatars}
      />
    </div>
  );
};

export default DesktopMenu;
