import React from "react";
import axios from "axios";
import { getCookie } from "../../../../utils/GetCookie";

const StoreChips = ({ chips, setChips, username }) => {
  async function updateBackend(newChips, username) {
    const token = getCookie("token");

    try {
      const { data } = await axios.put(
        "http://localhost:6001/update-chips",
        { newChipCount: newChips, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (data.status === 1) {
        setChips(newChips);
      } else {
        console.log("Failed to update backend");

      }
    } catch (error) {
      console.log("Error while updating backend:", error);

    }
  }

  function handlePlusChips(add) {
    const newChips = chips + add;
    updateBackend(newChips, username);
  }

  function handleBuyChips(cost, amount) {
    if (chips >= cost) {
      const newChips = chips - cost + amount;
      updateBackend(newChips, username);
    } else {
      alert("Not enough chips to make this purchase");
  
    }
  }

  return (
    <div className="chipsContainer">
      <div className="chipsTitle">Store Chips</div>
      <div>Your Chips: {chips}</div>
      <div className="getChips">
        Get Chips
        <ul>
          <li
            className="amberButton"
            onClick={() => {
              handlePlusChips(100);
            }}
          >
            + 100
          </li>
        </ul>
      </div>
      <div className="getChips">
        Buy Chips
        <ul>
          <li
            className="amberButton"
            onClick={() => {
              handleBuyChips(10, 100);
            }}
          >
            + 100 for 10 chips
          </li>
          <li
            className="amberButton"
            onClick={() => {
              handleBuyChips(100, 1000);
            }}
          >
            + 1000 for 100 chips
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StoreChips;
