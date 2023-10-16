import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./LogOut";

const Burger = ({
  setLoggedIn,
  username,
  chips,
  setChips,
  avatar,
  setAvatar,
  setWins,
  setDraws,
  setLoses,
  setUserAvatars,
  setUsername,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`burger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {open && (
        <div className="d-flex flex-column burgerMenu">
          <ul className="d-flex flex-column align-items-end">
            <li>
              <Link to="/BlackJack" onClick={() => setOpen(false)}>
                Blackjack
              </Link>
            </li>
            <li>
              <Link to="/store" onClick={() => setOpen(false)}>
                Store
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </li>

            <li>
              <Logout
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
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Burger;
