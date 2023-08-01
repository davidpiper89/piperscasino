import React, { useState } from "react";
import './HomeNotLoggedIn.css'; // Import custom styles

const HomeNotLoggedIn = ({ setLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      setLoggedIn(true);
    } else {
      console.log(
        `Signing up with email: ${email}, username: ${username}, and password: ${password}`
      );
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="form">
        {!isLogin && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control form-input"
          />
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="form-control form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-control form-input"
        />
        <input 
          type="submit" 
          value={isLogin ? "Login" : "Signup"}
          className="btn btn-primary form-submit"
        />
      </form>
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
