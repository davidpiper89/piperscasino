import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import HomeNotLoggedIn from "./notLoggedIn/HomeNotLoggedIn";
import HomeLoggedIn from "./loggedIn/HomeLoggedIn";
import "./Home.css";

const Home = ({ loggedIn, setLoggedIn, chips, setChips, username, setUsername }) => {
  const [user] = useAuthState(auth);


 

  const renderHomeContent = () => {
    if (loggedIn || user) {
      return (
        <HomeLoggedIn
          setLoggedIn={setLoggedIn}
          username={username}
          chips={chips}
          setChips={setChips}
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
        />
      </div>
    );
  };

  return <>{renderHomeContent()}</>;
};

export default Home;
