import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Blackjack from "./Blackjack/Blackjack";
import Home from "./components/home/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/home/loggedIn/profile/Profile";
import Store from "./components/home/loggedIn/store/Store";

function App() {
  const initialUsername = localStorage.getItem("username") || "";
  const initialChips = localStorage.getItem("chips") 
  const [loggedIn, setLoggedIn] = useState(false);
  const [chips, setChips] = useState(initialChips);
  const [username, setUsername] = useState(initialUsername);

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
            />
          }
        />
        <Route
          path="/blackjack"
          element={
            <Blackjack chips={chips} setChips={setChips} username={username} />
          }
        />
        <Route path="/profile" element={<Profile username={username} />} />
        <Route
          path="/store"
          element={
            <Store chips={chips} setChips={setChips} username={username} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
