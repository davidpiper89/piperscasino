import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import HomeNotLoggedIn from "./notLoggedIn/HomeNotLoggedIn";
import HomeLoggedIn from "./loggedIn/HomeLoggedIn";
import "./Home.css";

const Home = ({ loggedIn, setLoggedIn, setToken, setUsername, username }) => {
  const [user] = useAuthState(auth);


  const renderHomeContent = () => {
    if (loggedIn || user) {
      return <HomeLoggedIn setLoggedIn={setLoggedIn} username={username} />;
    }

    return (
      <div className="homeContainer">
        <div className="title">Welcome to Piper's Casino</div>
        <HomeNotLoggedIn
          setLoggedIn={setLoggedIn}
          setToken={setToken}
          setUsername={setUsername}
          username={username}
          
        />
      </div>
    );
  };

  return <>{renderHomeContent()}</>;
};

export default Home;
