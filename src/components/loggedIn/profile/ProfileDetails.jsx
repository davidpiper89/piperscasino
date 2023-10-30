import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../utils/GetCookie";
import { validate } from "../../../validation";
import {apiURL} from "../../../config/apiUrl"

const ProfileDetails = ({ username, setUsername }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username || "");

  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUsernameChange = async () => {
    if (!newUsername || newUsername.trim() === "") {
      alert("Username cannot be empty.");
      return;
    }

    const responseMessage = await updateUsernameBackend(newUsername);
    alert(responseMessage.message);
    if (responseMessage.message === "Username updated successfully.") {
      setUsername(newUsername);
      setEditingUsername(false);

    }
  };

  const updateUsernameBackend = async (newUsername) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        `${apiURL}/update-username`,
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return "An error occurred. Please try again.";
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    const passwordErrors = validate("", newPassword, "", false);
    setErrors(passwordErrors || {});

    if (currentPassword === newPassword) {
      alert("New password cannot be the same as the current password.");
      return;
    }

    if (passwordErrors && passwordErrors.password) {
      alert(passwordErrors.password);
      return;
    }

    const responseMessage = await updateBackend(currentPassword, newPassword);
    alert(responseMessage);
    if (responseMessage === "Password updated successfully.") {
      setEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const updateBackend = async (currentPassword, newPassword) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        `${apiURL}/update-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return "An error occurred. Please try again.";
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
