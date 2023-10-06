import React from "react";

const Header = ({ title, leftIcon, rightContent }) => {
  return (
    <header className="headerContainer">
      {leftIcon}
      <h2 className="headerTitle">{title}</h2>
      {rightContent}
    </header>
  );
};

export default Header;
