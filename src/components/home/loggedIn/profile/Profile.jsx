import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./Profilestyles.css";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import { HomeButton } from "../HomeButton";

const Profile = ({ username: propUsername }) => {
  const [username, setUsername] = useState(propUsername);

  useEffect(() => {
    if (!username) {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [username]);

  return (
    <div className="profileSection">
      <Header title={username} leftIcon={<HomeButton />} />
      <ProfileAvatar />
      <ProfileDetails propUsername={username} />
    </div>
  );
};

export default Profile;
