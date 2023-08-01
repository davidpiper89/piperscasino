import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./LogOut";

const Burger = () => {
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
        <div className="burger-menu">
          <ul className="d-flex flex-column align-items-end">
            <li>
              <Link to="/BlackJack" onClick={() => setOpen(false)}>
                Blackjack
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Burger;
