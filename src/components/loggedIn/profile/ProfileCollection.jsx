import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar1 from "../../../assets/avatar1.webp";
import avatar2 from "../../../assets/avatar2.webp";
import avatar3 from "../../../assets/avatar3.webp";
import avatar4 from "../../../assets/avatar4.webp";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const avatarMap = {
  avatar1: avatar1,
  avatar2: avatar2,
  avatar3: avatar3,
  avatar4: avatar4,
};

const ProfileCollection = ({ userAvatars, setAvatar, UID }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = (avatarId) => {
    setSelectedAvatar(avatarMap[avatarId]);
  };

  const confirmSelection = async () => {
    setAvatar(selectedAvatar);
    const userAvatarRef = doc(db, "casino_users", UID);
    await updateDoc(userAvatarRef, {
      avatar: selectedAvatar,
    });
    setSelectedAvatar(null);
  };

  return (
    <div className="collectionContainer">
      <h2 className="collectionTitle">Avatar Collection</h2>
      <div className="avatarCollection">
        {userAvatars.length > 0 ? (
          userAvatars.map((avatarObj, index) => {
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
          })
        ) : (
          <p className="emptyCollectionMessage">
            Buy avatars at our{" "}
            <Link to="/STORE" className="storeLink">
              store.
            </Link>
          </p>
        )}
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
            <button className="defaultBtn" onClick={confirmSelection}>
              Confirm
            </button>
            <button
              className="defaultBtn"
              onClick={() => setSelectedAvatar(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCollection;
