// components/RequestOtp.js
import { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';

  const RequestOtp = ({ setFormType, setEmail }) => {
  const [email, setEmailLocal] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/forgetpassword/requestOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      //await axios.post('/api/auth/forgetpassword/requestOtp', { email: email });
      alert('OTP sent to your email');
      setEmail(email); // Save email to state
      setFormType('verifyOtp');
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  return (
    <div className="center">
        <form onSubmit={handleRequestOtp} className="form-container">
        <div>
            <label className="label">Enter your email</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)}
            className="input-field"
            required
            />
        </div>
        <button type="submit" className="submit-button">
            Request OTP
        </button>
        </form>
    </div>
  );
};

export default RequestOtp;
