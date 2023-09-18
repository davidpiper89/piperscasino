import React, { useState } from "react";

function ProfileBio({ username, bio: initialBio, avatar: initialAvatar }) {
  const [bio, setBio] = useState(initialBio);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [editingBio, setEditingBio] = useState(!initialBio);
  const [editingAvatar, setEditingAvatar] = useState(!initialAvatar);

  const handleBioSubmit = () => {
    setEditingBio(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
      setEditingAvatar(false);
    }
  };

  return (
    <div className="profileBio">
      {avatar ? (
        <img src={avatar} alt="User Avatar" className="profileAvatar" />
      ) : editingAvatar ? (
        <div className="avatarContainer">
          <div className="avatarTitle"> Avatar : </div>
          <input type="file" onChange={handleAvatarChange} />
        </div>
      ) : (
        <button onClick={() => setEditingAvatar(true)}>Add Avatar</button>
      )}
      <h2>{username}</h2>
      {bio ? (
        <p>{bio}</p>
      ) : editingBio ? (
        <div>
          <input
            type="text"
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button onClick={handleBioSubmit}>Save</button>
        </div>
      ) : (
        <button onClick={() => setEditingBio(true)}>Add Bio</button>
      )}
    </div>
  );
}

export default ProfileBio;
