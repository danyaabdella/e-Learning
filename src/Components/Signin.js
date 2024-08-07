// components/Signin.js
//'use client'
import { useState } from 'react';
import MM from '@/app/MM/page';
import '../styles/auth.css'; 
import Link from 'next/link';

const Signin = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  

  const handleSignin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Signin successful!');
      <MM />
   // <Link href='../dashboard'></Link>
    } 
    
  };

  return (
    // <div className= "center">
      <form onSubmit={handleSignin} className="form-container">
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign In
        </button>
        <p className="link">
          Don't have an account?{' '}
          <span className="spinner" onClick={() => setFormType('signup')}>
            Sign Up
          </span>
        </p>
        <p className="link">
          <span className="spinner" onClick = {()=> setFormType('requestOtp')}>
            Forgot Password?
          </span>
        </p>
        <p className="link">
          <Link className="spinner" href ='/resetPassword'>
            Reset Password?
          </Link>
        </p>

      </form>
   // </div>
  );
};

export default Signin;
