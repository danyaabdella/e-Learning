

import { useState } from 'react';

const VerifyOtp = ({ onOtpVerified, email }) => {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/forgetpassword/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Attempt to parse any error message from the server
        throw new Error(errorData.message || 'Invalid OTP');
      }

      alert('OTP verified');
      onOtpVerified(); // Proceed to the next step
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
      <button type="submit" className="submit-button">Verify OTP</button>
    </form>
  );
};

export default VerifyOtp;
