import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import "./Profilestyles.css";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";

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
      <ProfileHeader username={username} />

      <ProfileAvatar />
      <ProfileDetails propUsername={username} />
    </div>
  );
};

export default Profile;
