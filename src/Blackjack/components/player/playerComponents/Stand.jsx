import React from "react";

const Stand = ({ handIndex, playerCards, stand, setStand }) => {
  const handleStand = (index) => {
    let updatedStand = [...stand];
    updatedStand[index] = true;
    setStand(updatedStand);
  };

  const buttonText = window.innerWidth <= 480 ? "S" : "Stand";

  return (
    <button className="standButton d-flex" onClick={() => handleStand(handIndex)}>
          <div>{buttonText}</div>
    </button>
  );
};
export default Stand;
