import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Blackjack from "./blackjack/Blackjack";
import Home from "./components/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/loggedIn/profile/Profile";
import Store from "./components/loggedIn/store/Store";
import defaultProfile from "./assets/DefaultProfile.svg";
import { useLocalStorage } from "./hooks/customHooks";
import { DEFAULT_RESULTS, DEFAULT_CHIPS } from "./config/config";

export const ROUTE_PATHS = {
  HOME: "/",
  BLACKJACK: "/BLACKJACK",
  PROFILE: "/PROFILE",
  STORE: "/STORE",
};

// App Component: The main application component that manages routes and state for user information.
function App() {
  // Using useLocalStorage for state management and syncing with localStorage
  const [username, setUsername] = useLocalStorage("username", "");
  const [chips, setChips] = useLocalStorage("chips", DEFAULT_CHIPS);
  const [avatar, setAvatar] = useLocalStorage("avatar", defaultProfile);
  const [wins, setWins] = useLocalStorage("wins", DEFAULT_RESULTS);
  const [loses, setLoses] = useLocalStorage("loses", DEFAULT_RESULTS);
  const [draws, setDraws] = useLocalStorage("draws", DEFAULT_RESULTS);
  const [userAvatars, setUserAvatars] = useLocalStorage("avatars", []);
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [UID, setUID] = useLocalStorage("UID", "");

  const navigate = useNavigate();

  // Redirects the user to the homepage if not logged in
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Routes>
      <Route
        path={ROUTE_PATHS.HOME}
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
            UID={UID}
            setUID={setUID}
          />
        }
      />
      <Route
        path={ROUTE_PATHS.BLACKJACK}
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
            UID={UID}
            setUID={setUID}
          />
        }
      />
      <Route
        path={ROUTE_PATHS.PROFILE}
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
            UID={UID}
          />
        }
      />
      <Route
        path={ROUTE_PATHS.STORE}
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
            chips={chips}
            UID={UID}
          />
        }
      />
    </Routes>
  );
}

export default App;
