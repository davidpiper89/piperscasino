import React from "react";
import { auth } from "../../../firebase";

const Message = ({ msg, username}) => {
  // Check if the current user is the sender
  const isSender = auth.currentUser && auth.currentUser.uid === msg.uid;
  const displayName = isSender
    ? auth.currentUser.displayName || username
    : msg.name;
  return (
    <div className={`message ${isSender ? "sender" : ""}`}>
      <span className="username">{displayName}</span>
      <p>{msg.text}</p>
    </div>
  );
};

export default Message;
