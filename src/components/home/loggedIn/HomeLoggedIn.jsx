import React from "react";
import { Link } from "react-router-dom";
import { HomeButton } from "../loggedIn/HomeButton";
import Burger from "./Burger";

import "./HomeLoggedIn.css";

const HomeLoggedIn = ({setLoggedIn}) => {
  return (
    <div className="loggedInContainer">
      <header className="d-flex">
      <HomeButton />
      <h1 className="welcome m-auto">Welcome</h1>
      <div className="m-auto"><Burger /></div>
      
      </header>
      <div className="gameLink">
        <h2>BlackJack</h2>
        <button className="btnGame">
          <Link to="/BlackJack">Play Now</Link>
        </button>
      </div>
      
    </div>
  );
};

export default HomeLoggedIn;
