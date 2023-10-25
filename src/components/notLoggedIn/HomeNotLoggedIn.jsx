import React, { useState } from "react";
import axios from "axios";
import { validate } from "../../validation";
import { signInWithCustomToken, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import "./HomeNotLoggedIn.css";
import { ToastContainer, toast } from "react-toastify";
import defaultProfile from "../../assets/DefaultProfile.svg";

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
    if (data.status === 1) {
      setLoggedIn(true);
      setUsername(userDetails.username);
      localStorage.setItem("username", userDetails.username);
      setChips(data.chips);
      localStorage.setItem("chips", data.chips.toString());
      setAvatar(data.avatar || defaultProfile);
      localStorage.setItem("avatar", data.avatar || defaultProfile);
      toast.success("Logged in successfully");

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
    <div className="formContainer">
      <h2 className="formTitle">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isLogin && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="formControl formInput"
            />
            {errors.email && (
              <div className="alert alertDanger">{errors.email}</div>
            )}
          </>
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="formControl formInput"
        />
        {errors.username && (
          <div className="alert alertDanger">{errors.username}</div>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="formControl formInput"
        />
        {errors.password && (
          <div className="alert alertDanger">{errors.password}</div>
        )}
        {!isLogin && (
          <>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="formControl formInput"
            />
            {errors.confirmPassword && (
              <div className="alert alertDanger">{errors.confirmPassword}</div>
            )}
          </>
        )}
        <button type="submit" className="loginBtn formSubmit">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <ToastContainer />
      {/* <div className="mb-4">
        <GoogleButton onClick={googleSignIn} />
      </div> */}
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="signupBtn formSwitch"
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};
export default HomeNotLoggedIn;
