import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => setShowLoginForm(true);

  // Hard-coded credentials
  const hardCodedEmail = 'test@example.com';
  const hardCodedPassword = '123456';


  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
      setShowLoginForm(true); 
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email === hardCodedEmail && password === hardCodedPassword) {
      setError('');

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate('/posts');
    } else {
      setError('Wrong credentials, please try again.');
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

            {/* Remember Me Checkbox */}
            <div className="formGroup rememberMe">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Remember Me</label>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="submitButton">
              Login
            </button>

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
