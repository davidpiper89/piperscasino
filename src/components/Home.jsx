import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import HomeNotLoggedIn from "./notLoggedIn/HomeNotLoggedIn";
import HomeLoggedIn from "./loggedIn/HomeLoggedIn";
import "./Home.css";
import { auth } from "../firebase/firebase";

const Home = ({
  loggedIn,
  setLoggedIn,
  chips,
  setChips,
  username,
  setUsername,
  avatar,
  setAvatar,
  setWins,
  setDraws,
  setLoses,
  setUserAvatars,
  UID,
  setUID
}) => {
  const [user] = useAuthState(auth);

  const renderHomeContent = () => {
    if (loggedIn || user) {
      return (
        <HomeLoggedIn
          setLoggedIn={setLoggedIn}
          username={username}
          chips={chips}
          setChips={setChips}
          avatar={avatar}
          setUsername={setUsername}
          setWins={setWins}
          setDraws={setDraws}
          setLoses={setLoses}
          setUserAvatars={setUserAvatars}
          setAvatar={setAvatar}
          
        />
      );
    }

    return (
      <div className="homeContainer">
        <div className="title">Piper's Casino</div>
        <HomeNotLoggedIn
          setLoggedIn={setLoggedIn}
          setUsername={setUsername}
          username={username}
          setChips={setChips}
          avatar={avatar}
          setAvatar={setAvatar}
          setWins={setWins}
          setDraws={setDraws}
          setLoses={setLoses}
          setUserAvatars={setUserAvatars}
          UID={UID}
          setUID={setUID}
        />
      </div>
    );
  };

  return <>{renderHomeContent()}</>;
};

export default Home;
