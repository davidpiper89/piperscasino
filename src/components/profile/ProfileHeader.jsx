import React from "react";
import "./Profilestyles.css";
import { HomeButton } from "../home/loggedIn/HomeButton";

const ProfileHeader = ({ username }) => {
  return (
    <header className="profileHeaderContainer">
      <HomeButton />
      <h2 className="welcome">{username}</h2>
    </header>
  );
};

export default ProfileHeader;
