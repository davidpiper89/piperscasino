import React, { useState } from "react";
import avatar1 from "../../../assets/avatar1.png";
import avatar2 from "../../../assets/avatar2.png";
import avatar3 from "../../../assets/avatar3.png";
import avatar4 from "../../../assets/avatar4.png";

const avatarMap = {
  avatar1: avatar1,
  avatar2: avatar2,
  avatar3: avatar3,
  avatar4: avatar4,
};

const ProfileCollection = ({ userAvatars, setAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = (avatarId) => {
    setSelectedAvatar(avatarMap[avatarId]);
  };

  const confirmSelection = () => {
    if (selectedAvatar) {
      setAvatar(selectedAvatar);
      setSelectedAvatar(null);
    }
  };

  return (
    <div className="collectionContainer">
      <h2 className="collectionTitle">Your Collection</h2>
      <div className="avatarCollection">
        {userAvatars.map((avatarObj, index) => {
          const avatarImage = avatarMap[avatarObj.avatar_id];
          return (
            <img
              key={index}
              src={avatarImage}
              alt={`Avatar ${index + 1}`}
              className="collectionAvatar"
              onClick={() => handleClick(avatarObj.avatar_id)}
            />
          );
        })}
      </div>
      {selectedAvatar && (
        <div className="selectionContainer">
          <img
            src={selectedAvatar}
            alt="Selected Avatar"
            className="collectionAvatar"
          />
          <p>Do you want to set this as your avatar?</p>
          <div className="buttonGroup">
            <button onClick={confirmSelection}>Confirm</button>
            <button onClick={() => setSelectedAvatar(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCollection;
