import React from "react";
import { auth } from "../../../../firebase";

const Message = ({ msg }) => {
  // Check if the current user is the sender
  const isSender = auth.currentUser && auth.currentUser.uid === msg.uid;

  return (
    <div className={`message ${isSender ? 'sender' : ''}`}>
      <span className="username">{msg.name}</span>
      <p>{msg.text}</p>
    </div>
  );
};

export default Message;
