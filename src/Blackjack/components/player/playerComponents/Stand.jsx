import React from "react";
import { MOBILE_BUTTON_BREAKPOINT } from "../../../../config/config";

const Stand = ({ handIndex, stand, setStand }) => {
  const handleStand = (index) => {
    let updatedStand = [...stand];
    updatedStand[index] = true;
    setStand(updatedStand);
  };

  const buttonText =
    window.innerWidth <= MOBILE_BUTTON_BREAKPOINT ? "S" : "Stand";

  return (
    <button
      className="standButton d-flex"
      onClick={() => handleStand(handIndex)}
    >
      <div>{buttonText}</div>
    </button>
  );
};
export default Stand;
