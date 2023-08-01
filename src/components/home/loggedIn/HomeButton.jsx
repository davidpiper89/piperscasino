import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export const HomeButton = () => {
  return (
    <div className="m-auto">
      <Link to="/">
        <FontAwesomeIcon className="home-button" icon={faHouse} />
      </Link>
    </div>
  );
};
