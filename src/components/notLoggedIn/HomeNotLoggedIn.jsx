import React, { useState } from "react";
import { validate } from "../../validation";
import "./HomeNotLoggedIn.css";
import { ToastContainer, toast } from "react-toastify";
import defaultProfile from "../../assets/DefaultProfile.svg";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth, db } from "../../firebase/firebase";
import { DEFAULT_CHIPS, DEFAULT_RESULTS } from "../../config/config";

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
  setUID,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const setUserDataInStorage = (data, uid) => {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value.toString());
    });
    localStorage.setItem("UID", uid.toString());
    setUID(uid);
    setUsername(data.username);
    setChips(data.chips);
    setAvatar(data.avatar);
    setWins(data.wins);
    setDraws(data.draws);
    setLoses(data.loses);
    setUserAvatars(data.avatars);
  };

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

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // User is authenticated, now get their data from Firestore.

        const uid = userCredential.user.uid;

        const userDocRef = doc(db, "casino_users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // User data exists, update the state with the user data.
          const userData = userDoc.data();
          setUserDataInStorage(userData, uid);
          setLoggedIn(true);
        } else {
          toast.error("No user found.");
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const uid = userCredential.user.uid;
        const newUser = {
          username: username,
          chips: DEFAULT_CHIPS,
          wins: DEFAULT_RESULTS,
          loses: DEFAULT_RESULTS,
          draws: DEFAULT_RESULTS,
          avatar: defaultProfile,
          avatars: [],
        };
        await setDoc(doc(db, `casino_users`, uid), newUser);
        setUserDataInStorage(newUser, uid);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Authentication failed. Please check your details and try again."
      );
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "casino_users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // User exists in Firestore, fetch the data and update the app's state
        const userData = userDocSnapshot.data();

        setUserDataInStorage(userData, user.uid);
        setLoggedIn(true);
      } else {
        // User doesn't exist in Firestore, create a new user entry
        const newUser = {
          username: user.displayName,
          chips: DEFAULT_CHIPS,
          wins: DEFAULT_RESULTS,
          loses: DEFAULT_RESULTS,
          draws: DEFAULT_RESULTS,
          avatar: defaultProfile,
          avatars: [],
        };
        await setDoc(userDocRef, newUser);
        setUserDataInStorage(newUser, user.uid);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
      toast.error("Google Sign-In failed. Please try again.");
    }
  };
  return (
    <div className="formContainer">
      <h2 className="formTitle">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="form">
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

        {!isLogin && (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="formControl formInput"
            />{" "}
          </>
        )}
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

      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="signupBtn formSwitch"
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
      <div className="mt-3">
        <GoogleButton onClick={googleSignIn} />
      </div>
    </div>
  );
};
export default HomeNotLoggedIn;
