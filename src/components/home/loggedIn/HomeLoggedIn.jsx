import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { HomeButton } from "../loggedIn/HomeButton";
import Burger from "./Burger";
import Chatroom from "./chatRoom/ChatRoom";
import { auth } from "../../../firebase";
import "./HomeLoggedIn.css";

const HomeLoggedIn = ({ setLoggedIn, username }) => {
  const [user] = useAuthState(auth);

  const Section = ({ title, content, onClick }) => (
    <section className="d-flex flex-column align-items-center section">
      <div onClick={onClick} className={`${title.toLowerCase()}Container`}>
        <div className="title">{title}</div>
        {content}
      </div>
    </section>
  );

  return (
    <div className="d-flex flex-column loggedInContainer">
      <header className="d-flex">
        <HomeButton />
        <h1 className="welcome m-auto">
          Welcome!
        </h1>
        <div className="m-auto">
          <Burger setLoggedIn={setLoggedIn} />
        </div>
      </header>
      <main className="mt-4 m-auto">
        <Section
          title="Games"
          content={<Link to="/BlackJack">Blackjack</Link>}
          onClick={() => {}}
        />
        <Section
          title="News"
          content={<p>Lorem, ipsum ... cum earum!</p>}
          onClick={() => {}}
        />
        <Section
          title="Chat"
          content={
            <div className="chatContent">
              <Chatroom />
            </div>
          }
          onClick={() => {}}
        />
      </main>
    </div>
  );
};

export default HomeLoggedIn;
