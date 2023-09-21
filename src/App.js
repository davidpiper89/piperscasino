import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Blackjack from "./Blackjack/Blackjack";
import Home from "./components/home/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile/Profile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [chips, setChips] = useState();
  const [username, setUsername] = useState("");


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
            <Blackjack
              chips={chips}
              setChips={setChips}
              username={username}
            />
          }
        />
        <Route path="/profile" element={<Profile username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
