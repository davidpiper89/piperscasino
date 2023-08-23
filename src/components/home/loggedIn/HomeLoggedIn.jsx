import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeButton } from "../loggedIn/HomeButton";
import Burger from "./Burger";
import Chatroom from "./chatRoom/ChatRoom";
import "./HomeLoggedIn.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

const HomeLoggedIn = ({ setLoggedIn }) => {
  const [showGames, setShowGames] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [user] = useAuthState(auth);
  const handleGamesClick = () => {
    setShowGames(!showGames);
  };

  const handleNewsClick = () => {
    setShowNews(!showNews);
  };
  const handleChatClick = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="d-flex flex-column loggedInContainer">
      <header className="d-flex">
        <HomeButton />
        <h1 className="welcome m-auto"> Welcome {user.displayName.split(" ")[0]}!</h1>
        <div className="m-auto">
          <Burger setLoggedIn={setLoggedIn} />
        </div>
      </header>
      <main className="mt-4 m-auto">
        {/* games */}
        <section className="d-flex flex-column align-items-center games-section">
          <div onClick={handleGamesClick} className="gamesContainer">
            <div className="title">Games</div>
            <div>
              <Link to="/BlackJack">Blackjack</Link>
            </div>
          </div>
        </section>

        {/* news */}
        <section className=" d-flex flex-column align-items-center news-section">
          <div onClick={handleNewsClick} className="newsContainer">
            <div className="title">News</div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
              velit doloremque minus iusto suscipit obcaecati accusantium at
              voluptas odio, nobis minima! Asperiores, quo veritatis sapiente
              aliquid ad illo cum earum!
            </p>
          </div>
        </section>
        {/* chat */}
        <section className="d-flex flex-column align-items-center chat-section">
          <div onClick={handleChatClick} className="chatContainer">
            <div className="title">Chat</div>
            <div className="chatContent">
              <Chatroom />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeLoggedIn;
