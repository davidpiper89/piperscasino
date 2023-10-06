import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../../utils/GetCookie";
import { validate } from "../../../../validation";

const ProfileDetails = ({ username }) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUsernameChange = () => {
    // logic for changing the username (e.g., update the backend)
    setEditingUsername(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    const passwordErrors = validate("", newPassword, "", false);
    setErrors(passwordErrors || {});

    if (passwordErrors && passwordErrors.password) {
      alert(passwordErrors.password);
      return;
    }

    const success = await updateBackend(currentPassword, newPassword);
    if (success) {
      setEditingPassword(false);
    }
  };

  const updateBackend = async (currentPassword, newPassword) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        "http://localhost:6001/update-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.status === 1) {
        console.log("password changed");
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
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
