import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';

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
          <path
            fill="#e63946"
            d="M12 0C7.03 0 3 4.03 3 9c0 6.75 8.9 16.62 8.9 16.62.22.24.58.24.8 0C12.1 25.62 21 15.75 21 9c0-4.97-4.03-9-9-9z"
          />
          <circle cx="12" cy="9" r="3.6" fill="#fff" opacity="0.95" />
        </svg>
      </div>
    </div>
  );
};

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => setShowLoginForm(true);

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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      {!showLoginForm ? (
        <div className="text-center">
          <h1 className="landingTitle">Local Lens</h1>
          <button className="btn btn-danger px-4 py-2 mt-3" onClick={handleGetStarted}>
            Get started
          </button>
        </div>
      ) : (
        <div className="card shadow p-4" style={{ width: "100%", maxWidth: "380px" }}>
          <h2 className="text-center mb-3">Login</h2>

          <AnimatedPin />

          <form onSubmit={handleLoginSubmit}>
         
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6c757d"
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

           
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            <button type="submit" className="btn btn-danger w-100">
              Login
            </button>

            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Register Now</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
