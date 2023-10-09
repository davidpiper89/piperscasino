import React from "react";
import { updateBackend } from "../../../utils/updateBackendChips";

const StoreChips = ({ chips, setChips, username }) => {
  async function handlePlusChips(add) {
    const result = await updateBackend(chips + add, username);
    if (result.success) {
      setChips(result.newChips);
    }
  }

  async function handleBuyChips(cost, amount) {
    if (chips >= cost) {
      const newChips = chips - cost + amount;
      const result = await updateBackend(newChips, username);
      if (result.success) {
        setChips(newChips);
      }
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
          <li className="amberButton" onClick={() => handlePlusChips(100)}>
            + 100
          </li>
        </ul>
      </div>
      <div className="chipsDivider"></div>
      <div className="buyChips">
        Buy Chips
        <ul>
          <li className="amberButton" onClick={() => handleBuyChips(10, 100)}>
            + 100 for 10 chips
          </li>
          <li className="amberButton" onClick={() => handleBuyChips(100, 1000)}>
            + 1000 for 100 chips
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StoreChips;
