import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import StatsModal from "./StatsModal";

const InfoButton = ({
  wins,
  loses,
  draws,
}) => {
  const [showStats, setShowStats] = useState(false);
  ;

  return (
    <>
      <button
        className="infoButton"
        onClick={() => {
          setShowStats(!showStats);
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </button>
      {showStats && (
        <StatsModal
          setShowStats={setShowStats}
          wins={wins}
          loses={loses}
          draws={draws}
        />
      )}
    </>
  );
};

export default InfoButton;
