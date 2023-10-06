import React, { useState } from "react";
import DefaultProfile from "../../../../assets/DefaultProfile.svg";

function ProfileAvatar() {
  const [avatar, setAvatar] = useState(DefaultProfile);
  const [newAvatar, setNewAvatar] = useState(null); 

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewAvatar(e.target.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmAvatar = () => {
    if (newAvatar) {
      setAvatar(newAvatar); 
      setNewAvatar(null); 
    }
  };

  const cancelAvatar = () => {
    setNewAvatar(null); 
  };

  return (
    <div className="avatarContainer">
      <div className="avatarTitle">Avatar</div>
      <img src={avatar} alt="User Avatar" className="avatarPicture" />
      {newAvatar && <img src={newAvatar} alt="New Avatar Preview" className="newAvatarPreview" />}
      <input type="file" onChange={handleAvatarChange} />
      {newAvatar && (
        <>
          <button onClick={confirmAvatar}>Confirm Avatar</button>
          <button onClick={cancelAvatar}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default ProfileAvatar;
