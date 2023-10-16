import React, { useState } from "react";
import axios from "axios";
import { validate } from "../../validation";
import { signInWithCustomToken, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import "./HomeNotLoggedIn.css";
import { ToastContainer, toast } from "react-toastify";
import defaultProfile from "../../assets/DefaultProfile.svg"

const HomeNotLoggedIn = ({
  setLoggedIn,
  setUsername,
  username,
  setChips,
  setAvatar,
  setWins,
  setDraws,
  setLoses,
  setUserAvatars,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate(
      username,
      password,
      email,
      isLogin,
      confirmPassword
    );

    setErrors(errors || {});
    if (errors) return;

    const userDetails = isLogin
      ? {
          username: username,
          password: password,
        }
      : {
          email: email,
          username: username,
          password: password,
        };

    try {
      if (isLogin) {
        await loginUser(userDetails);
      } else {
        const { data } = await axios.post(
          "http://localhost:6001/signup",
          userDetails,
          { withCredentials: true }
        );
        if (data.status === 1) {
          await loginUser({
            username: username,
            password: password,
          });
        } else {
          toast.error(
            data.error ||
              "Signup failed. Please check your details and try again."
          );
        }
      }
    } catch (err) {
      console.error("Error:", err.data ? err.data.message : err.message);
    }
  };

  const loginUser = async (userDetails) => {
    const { data } = await axios.post(
      "http://localhost:6001/login",
      userDetails,
      { withCredentials: true }
    );
    console.log(data);
    if (data.status === 1) {
      setLoggedIn(true);
      setUsername(userDetails.username);
      localStorage.setItem("username", userDetails.username);
      setChips(data.chips);
      localStorage.setItem("chips", data.chips.toString());
      setAvatar(data.avatar || defaultProfile); 
      localStorage.setItem("avatar", data.avatar || defaultProfile);
    
      if (data.results && data.results.length > 0) {
        const wins = data.results[0].casino_blackjack_wins || 0;
        setWins(wins);
        localStorage.setItem("wins", wins.toString());

        const draws = data.results[0].casino_blackjack_draws || 0;
        setDraws(draws);
        localStorage.setItem("draws", draws.toString());

        const loses = data.results[0].casino_blackjack_loses || 0;
        setLoses(loses);
        localStorage.setItem("loses", loses.toString());
      } else {
        setWins(0);
        localStorage.setItem("wins", "0");

        setDraws(0);
        localStorage.setItem("draws", "0");

        setLoses(0);
        localStorage.setItem("loses", "0");
      }

      setUserAvatars(data.avatars);
      localStorage.setItem("avatars", JSON.stringify(data.avatars));

      document.cookie = `token=${data.token}; Secure; HttpOnly;`;

      if (data.firebaseToken) {
        await signInWithCustomToken(auth, data.firebaseToken);
        if (!auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, {
            displayName: userDetails.username,
          });
        }
      }
    } else {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isLogin && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control form-input"
            />
            {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
          </>
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="form-control form-input"
        />
        {errors.username && (
          <div className="alert alert-danger">{errors.username}</div>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-control form-input"
        />
        {errors.password && (
          <div className="alert alert-danger">{errors.password}</div>
        )}
        {!isLogin && (
          <>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="form-control form-input"
            />
            {errors.confirmPassword && (
              <div className="alert alert-danger">{errors.confirmPassword}</div>
            )}
          </>
        )}
        <input
          type="submit"
          value={isLogin ? "Login" : "Signup"}
          className="btn btn-primary form-submit"
        />
      </form>
      <ToastContainer />
      {/* <div className="mb-4">
        <GoogleButton onClick={googleSignIn} />
      </div> */}
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="btn btn-secondary form-switch"
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};
export default HomeNotLoggedIn;
