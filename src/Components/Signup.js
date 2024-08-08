// components/Signup.js
'use client'
import { useState } from 'react';
import '../styles/auth.css';

const Signup = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res) {
      alert(data.message); 
    }
    setFormType('signin');
  };

  return (
   // <div className="center">
      <form onSubmit={handleSignup} className="form-container">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
        <p className="link">
          Already have an account?{' '}
          <span className="spinner" onClick={() => setFormType('signin')}>
            Sign In
          </span>
        </p>
      </form>
   // </div>
  );
};

 export default Signup;
