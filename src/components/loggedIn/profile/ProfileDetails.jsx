import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const ProfileDetails = ({ username, setUsername, setPassword, UID }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username || "");

  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const updateUsernameBackend = async (newUsername, UID) => {
    try {
      if (!newUsername || newUsername.trim() === "") {
        alert("Username cannot be empty.");
        return;
      }
      const userUsernameRef = doc(db, "casino_users", UID);
      await updateDoc(userUsernameRef, {
        username: newUsername,
      });
      setUsername(newUsername);
      alert("Successfully changed username.");
      setEditingUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
      alert("There was a problem updating the username.");
    }
  };

  const updatePasswordBackend = async (currentPassword, newPassword) => {
    console.log(currentPassword, newPassword);
    try {
      if (newPassword !== confirmNewPassword) {
        setErrors({ ...errors, password: "New passwords do not match." });
        return;
      }

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

    
      await updatePassword(auth.currentUser, newPassword);
      alert("Successfully changed password.");
      setEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      
      switch (error.code) {
        case "auth/wrong-password":
          alert("The current password is incorrect.");
          break;
        case "auth/weak-password":
          alert("The password is too weak. Please choose a stronger password.");
          break;
        default:
          alert(
            `There was a problem updating the password. Error: ${error.message}`
          );
          break;
      }
    }
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
            className="defaultBtn"
            onClick={() => updateUsernameBackend(newUsername, UID)}
          >
            Save Username
          </button>
        </div>
      ) : (
        <button
          className="defaultBtn"
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

          <button
            className="defaultBtn"
            onClick={() => updatePasswordBackend(currentPassword, newPassword)}
          >
            Save Password
          </button>
        </div>
      ) : (
        <button
          className="defaultBtn"
          onClick={() => setEditingPassword(true)}
        >
          Edit Password
        </button>
      )}
    </div>
  );
};

export default ProfileDetails;
