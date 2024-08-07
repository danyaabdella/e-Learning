// components/Signin.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/auth.css';
import '../styles/welcom.css';

const ResetPassword = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  //const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, newPassword }),
    });

    if (res) {
      alert('Password reset!');
    } 
    //router.push('/Signin');
  };

  return (
    <div className="center">
    <form onSubmit={handleSignin} className="form-container">
      
      
        <h1 className="header">Reset Password</h1>
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
        <label className="label">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Reset Password
      </button>
      
      

    </form>
    </div>
  );
};

export default ResetPassword;
