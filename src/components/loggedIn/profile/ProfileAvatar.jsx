import React from "react";

function ProfileAvatar({ avatar }) {
  return (
    <div className="avatarContainer">
      <div className="avatarTitle">Avatar</div>
      <img src={avatar} alt="User Avatar" className="avatarPicture" />
    </div>
  );
}

export default ProfileAvatar;
