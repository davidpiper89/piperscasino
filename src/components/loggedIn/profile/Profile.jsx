import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./Profilestyles.css";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import { HomeButton } from "../HomeButton";
import ProfileCollection from "./ProfileCollection";
import { fetchAvatars } from "../../../utils/fetchAvatars";
import Burger from "../Burger";
import DesktopMenu from "../DesktopMenu";
import useMobileDetector from "../../../hooks/useMobileDetector";

const Profile = ({
  username: propUsername,
  userAvatars,
  setUserAvatars,
  avatar,
  setAvatar,
  defualtProfile,
  setLoggedIn,
}) => {
  const [username, setUsername] = useState(propUsername);
  const [showDetails, setShowDetails] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const isMobile = useMobileDetector();

  useEffect(() => {
    fetchAvatars(username, setUserAvatars);
  }, []);

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
      <Header
        title={username}
        leftIcon={<HomeButton />}
        rightContent={
          <div className="burgerContainer">
            {isMobile ? (
              <Burger setLoggedIn={setLoggedIn} />
            ) : (
              <DesktopMenu setLoggedIn={setLoggedIn} />
            )}
          </div>
        }
      />
      <ProfileAvatar
        avatar={avatar}
        setAvatar={setAvatar}
        defualtProfile={defualtProfile}
        propUsername={propUsername}
        setPreviewAvatar={setPreviewAvatar}
      />
      <ProfileCollection
        userAvatars={userAvatars}
        setUserAvatars={setUserAvatars}
        setAvatar={setAvatar}
        previewAvatar={previewAvatar}
        setPreviewAvatar={setPreviewAvatar}
        propUsername={propUsername}
      />
      <button
        className="amberButton"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Close" : "Change Details"}
      </button>

      {showDetails && <ProfileDetails propUsername={username} />}
    </div>
  );
};
export default Profile;
