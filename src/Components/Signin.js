// components/Signin.js
'use client'
import { useState } from 'react';
import '../styles/auth.css'; 
import Link from 'next/link';


const Signin = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  
  

  const handleSignin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    
  
    if (res.ok) {
      //alert('Signin successful!');
      const token = data.token;
      localStorage.setItem('token', token);
      const userId = data.userID;
      localStorage.setItem('userId', userId);
      const email = data.Email;
      localStorage.setItem('Email', email);
      window.location.href = '/';
      // or use the Link component: <Link href='../dashboard'></Link>
    }
  };

  return (
    // <div className= "left">
      <form onSubmit={handleSignin} className="form-container">
         <h2>Signin</h2>
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
        
        <button type="submit" className="submit-button">
          Sign In
        </button>
        {/* <p className="link">
          Don't have an account?{' '}
          <Link className="spinner" href='/signup'>
            Sign Up
          </Link>
        </p> */}
        <p className="link">
          <Link className="spinner" href = '/forgetpassword'>
            Forgot Password?
          </Link>
          <Link className="spinner" href ='/resetPassword'>
            Reset Password?
          </Link>
        </p>
        <p className="link">
         
        </p>

      </form>
  //  </div>
  );
};

export default Signin;
