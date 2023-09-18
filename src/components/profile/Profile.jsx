import React from "react";
import ProfileHeader from "./ProfileHeader";
import "./Profilestyles.css";
import ProfileBio from "./ProfileBio";

const Profile = ({username}) => {
  return (
    <div className="profileSection">
      <ProfileHeader username={username}/>

      <div>
        <ProfileBio />
      </div>
    </div>
  );
};

export default Profile;
