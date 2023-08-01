import React from 'react';

const Logout = ({ setLoggedIn }) => {
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <button className="m-auto" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
