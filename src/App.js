import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Blackjack from "./Blackjack/Blackjack";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
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
              setToken={setToken}
              setUsername={setUsername}
              username={username}
            />
          }
        />
        <Route path="/blackjack" element={<Blackjack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
