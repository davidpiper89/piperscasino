import React from "react";
import StoreChips from "./StoreChips";
import StoreAvatars from "./StoreAvatars";
import Header from "../Header";
import { HomeButton } from "../HomeButton";
import "./Storecss.css";
import Burger from "../Burger";
import DesktopMenu from "../DesktopMenu";
import { useMobileDetector } from "../../../hooks/customHooks";

const Store = ({
  username,
  userAvatars,
  setUserAvatars,
  avatar,
  setAvatar,
  setLoggedIn,
  chips,
  setChips,
  setWins,
  setDraws,
  setLoses,
  setUsername,
  UID,
  setUID,
}) => {
  const isMobile = useMobileDetector();

  return (
    <div className="storeContainer">
      <Header
        title="Store"
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
      <StoreChips
        chips={chips}
        setChips={setChips}
        username={username}
        UID={UID}
        setUID={setUID}
      />
      <StoreAvatars
        chips={chips}
        setChips={setChips}
        username={username}
        userAvatars={userAvatars}
        setUserAvatars={setUserAvatars}
      />
    </div>
  );
};

export default Store;
