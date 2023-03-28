import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setPlayerStand, setDealerHidden } from "../../features/blackjackSlice";

const Stand = () => {
  const dispatch = useDispatch();

  const playerStand = () => {
    dispatch(setPlayerStand());
    dispatch(setDealerHidden());
  };
  return (
    <Button onClick={() => playerStand()} className="btn btn-dark btn-sm">
      Stand
    </Button>
  );
};

export default Stand;
