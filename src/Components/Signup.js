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
    if (res.ok) {
      alert(data.message);
      window.location.href = '/dashboard';
    } else {
      alert(data.message);
    }

   
  };

  return (
    <div>
    {/* <div className="center"> */}
      <form onSubmit={handleSignup} className="form-container">
        <h2>Signup</h2>
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
       
      </form>
   {/* </div> */}
   </div>
  );
};

 export default Signup;
