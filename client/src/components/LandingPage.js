import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">


      <div className="overlay"></div>

      <div className="landing-content">
        <h1 className="landing-title">LocalLens</h1>

        <p className="landing-subtitle">
          Discover hidden gems, explore new adventures, and travel local.
        </p>

        <button className="landing-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
