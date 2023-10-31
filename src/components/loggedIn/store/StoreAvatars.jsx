import React from "react";
import Avatar1 from "../../../assets/avatar1.png";
import Avatar2 from "../../../assets/avatar2.png";
import Avatar3 from "../../../assets/avatar3.png";
import Avatar4 from "../../../assets/avatar4.png";
import { db } from "../../../firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const StoreAvatars = ({
  chips,
  setChips,
  userAvatars,
  setUserAvatars,
  UID,
}) => {
  const ownedAvatarIds = userAvatars.map((avatar) => avatar.avatar_id);
  console.log(userAvatars);

  async function handlePurchaseAvatar(cost, avatarName, UID) {
    if (chips >= cost) {
      const newChips = chips - cost;
      setChips(newChips);
      const userAvatarsRef = doc(db, "casino_users", UID);
      await updateDoc(userAvatarsRef, {
        chips: newChips,
        avatars: arrayUnion({ avatar_id: avatarName }),
      });
      setUserAvatars((prevAvatars) => [
        ...prevAvatars,
        { avatar_id: avatarName },
      ]);
    } else {
      alert("Not enough chips to make this purchase");
    }
  }

  return (
    <div className="avatarsContainer">
      <div className="avatarsTitle">Store Avatars</div>
      <div className="avatarsPics">
        {!ownedAvatarIds.includes("avatar1") && (
          <div className="avatarItem">
            <img src={Avatar1} alt="avatar1" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar1", UID)}>
              Buy for 50 chips
            </button>
          </div>
        )}
        {!ownedAvatarIds.includes("avatar2") && (
          <div className="avatarItem">
            <img src={Avatar2} alt="avatar2" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar2", UID)}>
              Buy for 50 chips
            </button>
          </div>
        )}
        {!ownedAvatarIds.includes("avatar3") && (
          <div className="avatarItem">
            <img src={Avatar3} alt="avatar3" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar3", UID)}>
              Buy for 50 chips
            </button>
          </div>
        )}
        {!ownedAvatarIds.includes("avatar4") && (
          <div className="avatarItem">
            <img src={Avatar4} alt="avatar4" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar4", UID)}>
              Buy for 50 chips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreAvatars;
