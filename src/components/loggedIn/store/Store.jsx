import React, { useEffect } from "react";
import StoreChips from "./StoreChips";
import StoreAvatars from "./StoreAvatars";
import Header from "../Header";
import { HomeButton } from "../HomeButton";
import "./Storecss.css";
import Burger from "../Burger";
import DesktopMenu from "../DesktopMenu";
import useMobileDetector from "../../../hooks/useMobileDetector";


const Store = ({
  chips,
  setChips,
  username,
  userAvatars,
  setUserAvatars,
  setLoggedIn,
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
              <Burger setLoggedIn={setLoggedIn} />
            ) : (
              <DesktopMenu setLoggedIn={setLoggedIn} />
            )}
          </div>
        }
      />
      <StoreChips chips={chips} setChips={setChips} username={username} />
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
