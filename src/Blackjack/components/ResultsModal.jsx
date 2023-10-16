import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ResultsModal = ({ resetGame, setBet, resetOutcome, results }) => {
  const handleRestartGame = () => {
    resetGame();
    setBet(false);
    resetOutcome();
  };

  return (
    <Modal
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Game Results
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {results.map((result, index) => (
          <p key={index}>
            Hand {index + 1}: {result.result || "No Result"} (
            {result.stakeResult > 0 ? "+" : ""}
            {result.stakeResult || 0})
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleRestartGame}>
          Play Again?
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultsModal;
