import React from "react";
import "./Profilestyles.css";
import { HomeButton } from "../home/loggedIn/HomeButton";

const ProfileHeader = ({ username }) => {
  return (
    <header className="profileHeaderContainer">
      <HomeButton />
      <h2 className="profileTitle">{username}</h2>
    </header>
  );
};

export default ProfileHeader;
