import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeButton } from "../loggedIn/HomeButton";
import Burger from "./Burger";
import Chatroom from "./chatRoom/ChatRoom";
import "./HomeLoggedIn.css";
import DesktopMenu from "./DesktopMenu";
import Header from "./Header";
import blackjackIcon from "../../assets/blackjackIcon.png";
import { useMobileDetector } from "../../hooks/customHooks";

const HomeLoggedIn = ({
  setLoggedIn,
  username,
  chips,
  setChips,
  avatar,
  setAvatar,
  setWins,
  setDraws,
  setLoses,
  setUserAvatars,
  setUsername,
}) => {
  const isMobile = useMobileDetector();

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

  return (
    <div className="d-flex flex-column loggedInContainer">
      <Header
        title={`Welcome ${username}!`}
        leftIcon={<HomeButton />}
        rightContent={
          <div className="burgerContainer">
            {isMobile ? (
              <Burger
                setLoggedIn={setLoggedIn}
                setChips={setChips}
                username={username}
                setUsername={setUsername}
                chips={chips}
                avatar={avatar}
                setAvatar={setAvatar}
                setWins={setWins}
                setDraws={setDraws}
                setLoses={setLoses}
                setUserAvatars={setUserAvatars}
              />
            ) : (
              <DesktopMenu
                setLoggedIn={setLoggedIn}
                setChips={setChips}
                username={username}
                setUsername={setUsername}
                chips={chips}
                avatar={avatar}
                setAvatar={setAvatar}
                setWins={setWins}
                setDraws={setDraws}
                setLoses={setLoses}
                setUserAvatars={setUserAvatars}
              />
            )}
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
                <div>{username}</div>
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
