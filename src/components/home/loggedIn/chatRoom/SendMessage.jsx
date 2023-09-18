import React from "react";
import { useState } from "react";
import { auth, db } from "../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll, username}) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === "") {
      alert("please enter a valid message");
      return;
    }

    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName || username,
      uid,
      timestamp: serverTimestamp(),
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form className="sendMsg" onSubmit={sendMessage}>
      <input
        className="msgBox"
        value={message}
        onInput={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Message"
      ></input>
      <button className="msgBtn">Send</button>
    </form>
  );
};

export default SendMessage;
