import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

// ⭐ Optional: Animated Pin Logo Component
const AnimatedPin = () => {
  return (
    <div style={{ width: "70px", margin: "0 auto", marginBottom: "10px" }}>
      <style>
        {`
          .pin { position: relative; width: 50px; margin: auto; animation: drop 1s ease-out; }
          .pin svg { width: 100%; }
          @keyframes drop {
            0% { transform: translateY(-40px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .pulse {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 130%;
            height: 130%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background: rgba(230,57,70,0.18);
            animation: pulse 1.8s ease-out infinite;
          }
        `}
      </style>

      <div className="pin">
        <div className="pulse"></div>
        <svg viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">
          <path fill="#e63946" d="M12 0C7.03 0 3 4.03 3 9c0 6.75 8.9 16.62 8.9 16.62.22.24.58.24.8 0C12.1 25.62 21 15.75 21 9c0-4.97-4.03-9-9-9z"/>
          <circle cx="12" cy="9" r="3.6" fill="#fff" opacity="0.95"/>
        </svg>
      </div>
    </div>
  );
};

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => setShowLoginForm(true);

  // On load, check if a remembered user exists
  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedUser) {
      setEmail(rememberedUser.email);
      setPassword(rememberedUser.password || '');
      setRememberMe(true);
      setShowLoginForm(true);

      if (rememberedUser.role === "admin") navigate("/admindashoboard");
      else navigate("/HomePage");
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const user = data.user;

      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ ...user, password }));
      } else {
        localStorage.removeItem("rememberedUser");
      }

      if (user.role === "admin") navigate("/admindashoboard");
      else navigate("/HomePage");

    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      {!showLoginForm ? (
        <div className="landingContent">
          <h1 className="landingTitle">Local Lens</h1>
          <button className="getStartedButton" onClick={handleGetStarted}>
            Get started
          </button>
        </div>
      ) : (
        <div className="loginCard">
          <h2 className="loginTitle">Login</h2>

          {/* ⭐ Animated Pin Logo */}
          <AnimatedPin />

          <form onSubmit={handleLoginSubmit} className="form">
            <div className="formGroup">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input"
                required
              />
            </div>

            <div className="formGroup">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input"
                required
              />
            </div>

            <div className="formGroup rememberMe">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Remember Me</label>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="submitButton">Login</button>

            <div className="registerLink">
              <span className="linkText">Don't have an account? </span>
              <Link to="/register" className="link">Register Now</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
