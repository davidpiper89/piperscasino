import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Blackjack from "./Blackjack/Blackjack";
import Home from "./components/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/loggedIn/profile/Profile";
import Store from "./components/loggedIn/store/Store";
import defaultProfile from "./assets/DefaultProfile.svg"

function App() {
  const initialUsername = localStorage.getItem("username") || "";
  const initialChips = localStorage.getItem("chips");
  const [loggedIn, setLoggedIn] = useState(false);
  const [chips, setChips] = useState(initialChips);
  const [username, setUsername] = useState(initialUsername);
  const [userAvatars, setUserAvatars] = useState([]);
  const [avatar, setAvatar] = useState(defaultProfile);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("chips", chips);
  }, [username, chips]);

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
            />
          }
        />
        <Route
          path="/blackjack"
          element={
            <Blackjack chips={chips} setChips={setChips} username={username} />
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
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
