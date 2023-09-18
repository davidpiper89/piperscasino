import React from "react";
import { Link } from "react-router-dom";
import "./Profilestyles.css";
import { HomeButton } from "../home/loggedIn/HomeButton";

const ProfileHeader = ({ username }) => {
 
  return (
    <header className="profileHeaderContainer m-auto">
      <Link to="/">
        <HomeButton />
      </Link>
      <h2 className="welcome">{username}</h2>
      <div className="userActions">
        {/* <Link to="/settings">Settings</Link>
        <Link to="/editProfile">Edit Profile</Link> */}
      </div>
    </header>
  );
};

export default ProfileHeader;
