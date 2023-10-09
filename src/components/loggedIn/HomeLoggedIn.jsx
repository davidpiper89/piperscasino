import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { HomeButton } from "../loggedIn/HomeButton";
import Burger from "./Burger";
import Chatroom from "./chatRoom/ChatRoom";
import { auth } from "../../firebase";
import "./HomeLoggedIn.css";
import Logout from "./LogOut";
import Header from "./Header";
import blackjackIcon from "../../assets/blackjackIcon.png";

const HomeLoggedIn = ({ setLoggedIn, username, chips, setChips, avatar }) => {
  const [user] = useAuthState(auth);

  const displayName = user ? user.displayName || username : username;


  const Section = ({ title, content, onClick }) => (
    <section className="d-flex flex-column align-items-center section">
      <div onClick={onClick} className={`${title.toLowerCase()}Container`}>
        <div className="title">{title}</div>
        {content}
      </div>
    </section>
  );
  useEffect(() => {
    const storedChips = localStorage.getItem("chips");
    if (storedChips) {
      setChips(Number(storedChips));
    }
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const DesktopMenu = () => (
    <div className="desktopMenu">
      <Link to="/profile">Profile</Link>
      <Link to="/store">Store</Link>
      <Logout setLoggedIn={setLoggedIn} />
    </div>
  );

  return (
    <div className="d-flex flex-column loggedInContainer">
      <Header
        title={`Welcome ${displayName.split(" ")[0]}!`}
        leftIcon={<HomeButton />}
        rightContent={
          <div className="burgerContainer">
            {isMobile ? <Burger setLoggedIn={setLoggedIn} /> : <DesktopMenu />}
          </div>
        }
      />

      <main className="mt-4 m-auto">
        <Section
          title="Profile"
          content={
            <div className="profileContent">
              <img src={avatar} alt="User Avatar" className="userAvatar" />
              <div className="userInfo">
                <div>{displayName}</div>
                <p>Chips: {chips}</p>
              </div>
            </div>
          }
        />

        <Section
          title="Games"
          content={
            <div className="blackjackLinkContainer">
              <Link to="/BlackJack">
                <img
                  src={blackjackIcon}
                  alt="Blackjack"
                  className="blackjackIcon"
                />
                <div>Blackjack</div>
              </Link>
            </div>
          }
          onClick={() => {}}
        />

        {/* <Section
          title="News"
          content={<p>Slot machine next!</p>}
          onClick={() => {}}
        /> */}
        {/* <Section title="LeaderBoard" content={<p>leaderboard here</p>} /> */}
        <Section
          title="Chat"
          content={
            <div className="chatContent">
              <Chatroom username={username} />
            </div>
          }
          onClick={() => {}}
        />
      </main>
    </div>
  );
};

export default HomeLoggedIn;