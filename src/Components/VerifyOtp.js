// components/VerifyOtp.js
import { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';
//import { otpStorage } from './requestOtp';
//import  otp from '@/pages/api/auth/forgetpassword/requestOtp';


const VerifyOtp = ({ setFormType, email }) => {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
        
        await axios.post('/api/auth/forgetpassword/verifyOtp', { email, otp});
      alert('OTP verified');
      setFormType('setNewPassword');
      
      
    } catch (error) {
      alert('Invalid OTP or Error verifying OTP');
    }
  };

  return (
    <form onSubmit={handleVerifyOtp} className="form-container">
      <div>
        <label className="label">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Verify OTP
      </button>
    </form>
  );
};

export default VerifyOtp;

