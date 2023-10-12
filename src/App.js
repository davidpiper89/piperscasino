import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Blackjack from "./Blackjack/Blackjack";
import Home from "./components/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/loggedIn/profile/Profile";
import Store from "./components/loggedIn/store/Store";
import defaultProfile from "./assets/DefaultProfile.svg";

function App() {
  const initialUsername = localStorage.getItem("username") || "";
  const initialChips = localStorage.getItem("chips");
  const initialAvatar = localStorage.getItem("avatar") || defaultProfile;
  const initialWins = +localStorage.getItem("wins") || 0;
  const initialLoses = +localStorage.getItem("loses") || 0;
  const initialDraws = +localStorage.getItem("draws") || 0;

  const [loggedIn, setLoggedIn] = useState(false);
  const [chips, setChips] = useState(initialChips);
  const [username, setUsername] = useState(initialUsername);
  const [userAvatars, setUserAvatars] = useState([]);
  const [avatar, setAvatar] = useState(initialAvatar);

  const [wins, setWins] = useState(initialWins);
  const [loses, setLoses] = useState(initialLoses);
  const [draws, setDraws] = useState(initialDraws);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("chips", chips);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("wins", wins);
    localStorage.setItem("loses", loses);
    localStorage.setItem("draws", draws);
  }, [username, chips, avatar]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loggedIn={loggedIn}
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
            />
          }
        />
        <Route
          path="/blackjack"
          element={
            <Blackjack
              chips={chips}
              setChips={setChips}
              username={username}
              wins={wins}
              setWins={setWins}
              loses={loses}
              setLoses={setLoses}
              draws={draws}
              setDraws={setDraws}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              username={username}
              userAvatars={userAvatars}
              setUserAvatars={setUserAvatars}
              avatar={avatar}
              setAvatar={setAvatar}
              defaultProfile={defaultProfile}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/store"
          element={
            <Store
              chips={chips}
              setChips={setChips}
              username={username}
              userAvatars={userAvatars}
              setUserAvatars={setUserAvatars}
              setLoggedIn={setLoggedIn}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
