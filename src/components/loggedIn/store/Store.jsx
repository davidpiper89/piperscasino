import React, { useEffect, useState } from "react";
import StoreChips from "./StoreChips";
import StoreAvatars from "./StoreAvatars";
import Header from "../Header";
import { HomeButton } from "../HomeButton";
import "./Storecss.css";
import { fetchAvatars } from "../../../utils/fetchAvatars";

const Store = ({ chips, setChips, username, userAvatars, setUserAvatars }) => {
  useEffect(() => {
    fetchAvatars(username, setUserAvatars);
  }, []);

  return (
    <div className="storeContainer">
      <Header title="Store" leftIcon={<HomeButton />} />
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
