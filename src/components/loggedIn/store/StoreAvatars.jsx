import React from "react";
import Avatar1 from "../../../assets/avatar1.png";
import Avatar2 from "../../../assets/avatar2.png";
import Avatar3 from "../../../assets/avatar3.png";
import Avatar4 from "../../../assets/avatar4.png";
import { updateBackend } from "../../../utils/updateBackendChips";
import { updateUserAvatar } from "../../../utils/updateUserAvatar";

const StoreAvatars = ({ chips, setChips, username, userAvatars, setUserAvatars }) => {
  
  const ownedAvatarIds = userAvatars.map(avatar => avatar.avatar_id);
  
  async function handlePurchaseAvatar(cost, avatarName) {
    if (chips >= cost) {
      const result = await updateBackend(chips - cost, username);
      if (result.success) {
        setChips(result.newChips);
        const avatarResult = await updateUserAvatar(avatarName, username);
        if (avatarResult.success) {
          setUserAvatars(prevAvatars => [...prevAvatars, { avatar_id: avatarName }]);
        } else {
          alert("Failed to add avatar to collection. Please try again.");
        }
      } else {
        alert("Failed to purchase the avatar. Please try again.");
      }
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
            <button onClick={() => handlePurchaseAvatar(50, "avatar1")}>
              Buy for 50 chips
            </button>
          </div>
        )}
        {!ownedAvatarIds.includes("avatar2") && (
          <div className="avatarItem">
            <img src={Avatar2} alt="avatar2" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar2")}>
              Buy for 50 chips
            </button>
          </div>
        )}
        {!ownedAvatarIds.includes("avatar3") && (
          <div className="avatarItem">
            <img src={Avatar3} alt="avatar3" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar3")}>
              Buy for 50 chips
            </button>
          </div>
        )}
        {!ownedAvatarIds.includes("avatar4") && (
          <div className="avatarItem">
            <img src={Avatar4} alt="avatar4" />
            <button onClick={() => handlePurchaseAvatar(50, "avatar4")}>
              Buy for 50 chips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreAvatars;
