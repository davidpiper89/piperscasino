import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { validate } from "../../../validation";
import { db } from "../../../firebase/firebase";

const ProfileDetails = ({ username, setUsername, UID }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username || "");

  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const updateUsernameBackend = async (newUsername, UID) => {
    if (!newUsername || newUsername.trim() === "") {
      alert("Username cannot be empty.");
      return;
    }
    const userUsernameRef = doc(db, "casino_users", UID);
    await updateDoc(userUsernameRef, {
      username: newUsername,
    });
    setUsername(newUsername);
  };

  return (
    <div className="profileDetailsContainer">
      <h3>Change Username</h3>
      {editingUsername ? (
        <div>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button
            className="updateDetailsBtn"
            onClick={() => updateUsernameBackend(newUsername, UID)}
          >
            Save Username
          </button>
        </div>
      ) : (
        <button
          className="updateDetailsBtn"
          onClick={() => setEditingUsername(true)}
        >
          Edit Username
        </button>
      )}

      <h3>Change Password</h3>
      {editingPassword ? (
        <div>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button className="updateDetailsBtn" onClick={() => {}}>
            Save Password
          </button>
        </div>
      ) : (
        <button
          className="updateDetailsBtn"
          onClick={() => setEditingPassword(true)}
        >
          Change Password
        </button>
      )}
    </div>
  );
};

export default ProfileDetails;
