import React from "react";
import HomeNotLoggedIn from "./notLoggedIn/HomeNotLoggedIn";
import HomeLoggedIn from "./loggedIn/HomeLoggedIn";
import "./Home.css";

const Home = ({loggedIn, setLoggedIn}) => {

  return (
    <>
      {loggedIn ? (
        <HomeLoggedIn setLoggedIn={setLoggedIn} />
      ) : (
        <div className="homeContainer">
          <div className="title">Welcome to Piper's Casino</div>
          <HomeNotLoggedIn setLoggedIn={setLoggedIn} />
        </div>
      )}
    </>
  );
};

export default Home;
