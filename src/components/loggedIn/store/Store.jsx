import React from "react";
import StoreChips from "./StoreChips";
import StoreAvatars from "./StoreAvatars";
import Header from "../Header";
import { HomeButton } from "../HomeButton";
import "./Storecss.css";

const Store = ({ chips, setChips, username }) => {
  return (
    <div className="storeContainer">
      <Header title="Store" leftIcon={<HomeButton />} />
      <StoreChips chips={chips} setChips={setChips} username={username} />
      <StoreAvatars />
    </div>
  );
};

export default Store;
