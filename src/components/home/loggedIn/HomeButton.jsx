import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export const HomeButton = () => {
  return (
    <Link to="/" className="homeButton">
      <FontAwesomeIcon icon={faHouse} />
    </Link>
  );
};
