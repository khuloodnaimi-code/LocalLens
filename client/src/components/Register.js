import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setSuccess('');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname: name, email, password, role: "user" }), // always user
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        setSuccess('');
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      setError('');

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Register fetch error:", err);
      setError("Server error. Please try again later.");
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <div className="registerCard">
        <h2 className="registerTitle">Registration</h2>
        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="submitButton">Register</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <p className="loginText">
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
