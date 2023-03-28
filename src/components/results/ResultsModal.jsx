import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { setReset } from "../../features/blackjackSlice";
import { beginGame } from "../../utils/beginGame";
import {
  setInitialCards,
  setRemainderDeck,
  setGameStart,
} from "../../features/blackjackSlice";
import { deck } from "../../app/deck.js";
import { useDispatch } from "react-redux";

const ResultsModal = ({result}) => {
    console.log(result);
  const deckStart = [...deck];
  const dispatch = useDispatch();
  const playAgain = () => {
    dispatch(setReset());
    setTimeout(() => {
      const start = beginGame(deckStart);
      dispatch(setGameStart());
      dispatch(setInitialCards(start.initialCards));
      dispatch(setRemainderDeck(start.deck4));
    }, 100);
  };
  return (
    <Modal
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="d-flex align-items-center flex-column">
        <h4>{result.win}</h4>
        <p>{result.result}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          onClick={() => {
            playAgain();
          }}
        >
          Play again?
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultsModal;
