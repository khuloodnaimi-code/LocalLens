import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/UserSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // ✅ Import CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const message = useSelector((state) => state.users.message);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const data = { uname: name, email, password };
    dispatch(addUser(data));
    navigate("/login");
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
          <button type="submit" className="submitButton">Registeration</button>
          {message && <p className="message">{message}</p>}
          <p className="loginText">
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
