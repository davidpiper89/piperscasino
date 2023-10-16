import React, { useState } from "react";
import axios from "axios";
import avatar1 from "../../../assets/avatar1.png";
import avatar2 from "../../../assets/avatar2.png";
import avatar3 from "../../../assets/avatar3.png";
import avatar4 from "../../../assets/avatar4.png";
import { getCookie } from "../../../utils/GetCookie";

const avatarMap = {
  avatar1: avatar1,
  avatar2: avatar2,
  avatar3: avatar3,
  avatar4: avatar4,
};

const ProfileCollection = ({ userAvatars, setAvatar, username }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = (avatarId) => {
    setSelectedAvatar(avatarMap[avatarId]);
  };

  const confirmSelection = async () => {
    const token = getCookie("token");

    if (selectedAvatar) {
      setAvatar(selectedAvatar);
      try {
        const response = await axios.post(
          `http://localhost:6001/set-avatar/${username}`,
          {
            avatar: selectedAvatar,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data.status);

        if (response.data.status === 1) {
          console.log("Avatar successfully updated in the backend");
        } else {
          console.error("Failed to update avatar in the backend");
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
      }

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
            <button onClick={() => confirmSelection()}>Confirm</button>
            <button onClick={() => setSelectedAvatar(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCollection;
