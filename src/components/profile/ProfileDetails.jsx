import React, { useState } from "react";

const ProfileDetails = ({ username }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleUsernameChange = () => {
    // logic for changing the username (e.g., update the backend)
    setEditingUsername(false);
  };

  const handlePasswordChange = () => {
    // logic for changing the password (e.g., update the backend)
    setEditingPassword(false);
  };
  return (
    <div className="profileDetailsContainer">
      <h2>{username}</h2>
      <h3>Change Username</h3>
      {editingUsername ? (
        <div>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={handleUsernameChange}>Save Username</button>
        </div>
      ) : (
        <button onClick={() => setEditingUsername(true)}>Edit Username</button>
      )}

      <h3>Change Password</h3>
      {editingPassword ? (
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Save Password</button>
        </div>
      ) : (
        <button onClick={() => setEditingPassword(true)}>
          Change Password
        </button>
      )}
    </div>
  );
};

export default ProfileDetails;
