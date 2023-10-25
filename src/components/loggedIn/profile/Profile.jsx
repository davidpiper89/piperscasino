import React, { useState } from "react";
import Header from "../Header";
import "./Profilestyles.css";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import { HomeButton } from "../HomeButton";
import ProfileCollection from "./ProfileCollection";
import Burger from "../Burger";
import DesktopMenu from "../DesktopMenu";
import { useMobileDetector } from "../../../hooks/customHooks";

const Profile = ({
  username,
  setUsername,
  userAvatars,
  setUserAvatars,
  avatar,
  setAvatar,
  defualtProfile,
  setLoggedIn,
  chips,
  setChips,
  setWins,
  setDraws,
  setLoses,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const isMobile = useMobileDetector();

  return (
    <div className="profileSection">
      <Header
        title="Profile"
        leftIcon={<HomeButton />}
        rightContent={
          <div className="burgerContainer">
            {isMobile ? (
              <Burger
                setLoggedIn={setLoggedIn}
                setChips={setChips}
                username={username}
                setUsername={setUsername}
                chips={chips}
                avatar={avatar}
                setAvatar={setAvatar}
                setWins={setWins}
                setDraws={setDraws}
                setLoses={setLoses}
                setUserAvatars={setUserAvatars}
              />
            ) : (
              <DesktopMenu
                setLoggedIn={setLoggedIn}
                setChips={setChips}
                username={username}
                setUsername={setUsername}
                chips={chips}
                avatar={avatar}
                setAvatar={setAvatar}
                setWins={setWins}
                setDraws={setDraws}
                setLoses={setLoses}
                setUserAvatars={setUserAvatars}
              />
            )}
          </div>
        }
      />
      <ProfileAvatar
        avatar={avatar}
        setAvatar={setAvatar}
        defualtProfile={defualtProfile}
        username={username}
        setPreviewAvatar={setPreviewAvatar}
      />
      <ProfileCollection
        userAvatars={userAvatars}
        setUserAvatars={setUserAvatars}
        setAvatar={setAvatar}
        previewAvatar={previewAvatar}
        setPreviewAvatar={setPreviewAvatar}
        username={username}
      />
      <button
        className="amberButton"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Close" : "Change Details"}
      </button>

      {showDetails && (
        <ProfileDetails username={username} setUsername={setUsername} />
      )}
    </div>
  );
};
export default Profile;
