import React, { useState, useEffect } from "react";
import axios from "axios";
import { validate } from "../../../validation";
import {
  GoogleAuthProvider,
  signInWithCustomToken,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth } from "../../../firebase";
import "./HomeNotLoggedIn.css";

const HomeNotLoggedIn = ({ setLoggedIn, setToken, setUsername, username }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in with UID:", user.uid);
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate(username, password, email, isLogin);
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
        const { data } = await axios.post(
          "http://localhost:6001/login",
          userDetails
        );

        if (data.status === 1) {
          setLoggedIn(true);
          setToken(data.token);
          setUsername(userDetails.username);
          if (data.firebaseToken) {
            await signInWithCustomToken(auth, data.firebaseToken);
          }
        }
        if (data.status === 0) {
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:6001/signup",
          userDetails
        );
        if (data.status === 1) {
          console.log("successful signup");
        }
        if (data.status === 0) {
          console.log("duplicate user");
        }
      }
    } catch (err) {
      console.error("Error:", err.data ? err.data.message : err.message);
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
        <input
          type="submit"
          value={isLogin ? "Login" : "Signup"}
          className="btn btn-primary form-submit"
        />
      </form>
      <div className="mb-4">
        <GoogleButton onClick={googleSignIn} />
      </div>
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
