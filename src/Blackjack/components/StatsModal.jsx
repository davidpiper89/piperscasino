import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const StatsModal = ({ setShowStats, wins, loses, draws }) => {
  const hands = wins + loses + draws;
  return (
    <Modal
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => setShowStats(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Game Statistics
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Hands: {hands}</p>
        <p>Wins: {wins}</p>
        <p>Loses: {loses}</p>
        <p>Draws: {draws}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowStats(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatsModal;
