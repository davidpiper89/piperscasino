import React from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const StoreChips = ({ chips, setChips, username, UID }) => {
  async function handlePlusChips(add) {
    const userChipsRef = doc(db, "casino_users", UID);
    await updateDoc(userChipsRef, {
      chips: increment(100),
    });
    setChips(chips + 100);
  }

  async function handleBuyChips(cost, ammount, UID) {
    if (chips >= cost) {
      const newChips = chips - cost + ammount;
      const userChipsRef = doc(db, "casino_users", UID);
      await updateDoc(userChipsRef, {
        chips: newChips,
      });
      setChips(newChips);
    } else {
      alert("Not enough chips to make this purchase");
    }
  }

  return (
    <div className="chipsContainer">
      <div className="chipsTitle">Store Chips</div>
      <div className="yourChips">Your Chips: {chips}</div>
      <div className="chipsDivider"></div>
      <div className="getChips">
        Get Chips
        <ul>
          <li className="amberButton" onClick={() => handlePlusChips(100, UID)}>
            + 100
          </li>
        </ul>
      </div>
      <div className="chipsDivider"></div>
      <div className="buyChips">
        Buy Chips
        <ul>
          <li
            className="amberButton"
            onClick={() => handleBuyChips(10, 100, UID)}
          >
            + 100 for 10 chips
          </li>
          <li
            className="amberButton"
            onClick={() => handleBuyChips(100, 1000, UID)}
          >
            + 1000 for 100 chips
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StoreChips;
