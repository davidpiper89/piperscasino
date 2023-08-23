import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./LogOut";

const Burger = ({ setLoggedIn }) => {
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
        <div className="d-flex flex-column burger-menu">
          <ul className="d-flex flex-column align-items-end">
            <li>
              <Link to="/BlackJack" onClick={() => setOpen(false)}>
                Blackjack
              </Link>
            </li>
            <li>
              <Logout setLoggedIn={setLoggedIn}/>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Burger;
