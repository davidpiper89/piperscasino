import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Blackjack from "./Blackjack/Blackjack";
import Home from "./components/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/loggedIn/profile/Profile";
import Store from "./components/loggedIn/store/Store";
import defaultProfile from "./assets/DefaultProfile.svg";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const initialUsername = localStorage.getItem("username") || "";
  const initialChips = localStorage.getItem("chips");
  const initialAvatar = localStorage.getItem("avatar") || defaultProfile;
  const initialWins = +localStorage.getItem("wins") || 0;
  const initialLoses = +localStorage.getItem("loses") || 0;
  const initialDraws = +localStorage.getItem("draws") || 0;
  let initialAvatars = [];
  try {
    initialAvatars = JSON.parse(localStorage.getItem("avatars")) || [];
  } catch (error) {
    console.error("Error parsing avatars from localStorage:", error);
    localStorage.removeItem("avatars");
  }

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  const [chips, setChips] = useState(initialChips);
  const [username, setUsername] = useState(initialUsername);
  const [userAvatars, setUserAvatars] = useState(initialAvatars);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [wins, setWins] = useState(initialWins);
  const [loses, setLoses] = useState(initialLoses);
  const [draws, setDraws] = useState(initialDraws);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("chips", chips);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("wins", wins);
    localStorage.setItem("loses", loses);
    localStorage.setItem("draws", draws);
    localStorage.setItem("avatars", JSON.stringify(userAvatars));
  }, [username, chips, avatar, wins, loses, draws, userAvatars]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
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
            setUsername={setUsername}
            userAvatars={userAvatars}
            setUserAvatars={setUserAvatars}
            avatar={avatar}
            setAvatar={setAvatar}
            defaultProfile={defaultProfile}
            setLoggedIn={setLoggedIn}
            setChips={setChips}
            setWins={setWins}
            setLoses={setLoses}
            setDraws={setDraws}
          />
        }
      />
      <Route
        path="/store"
        element={
          <Store
            username={username}
            setUsername={setUsername}
            userAvatars={userAvatars}
            setUserAvatars={setUserAvatars}
            avatar={avatar}
            setAvatar={setAvatar}
            defaultProfile={defaultProfile}
            setLoggedIn={setLoggedIn}
            setChips={setChips}
            setWins={setWins}
            setLoses={setLoses}
            setDraws={setDraws}
          />
        }
      />
    </Routes>
  );
}

export default App;
