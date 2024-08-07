// pages/auth/forgetpassword.js
import { useState } from 'react';
import ForgetPassword from '@/components/ForgetPassword';
import VerifyOtp from '@/components/VerifyOtp';
import SetNewPassword from '@/components/SetNewPassword';

const ForgetPasswordPage = () => {
  const [formType, setFormType] = useState('requestOtp');
  const [email, setEmail] = useState('');

  const handleOtpRequested = (requestedEmail) => {
    setEmail(requestedEmail);
    setFormType('verifyOtp');
  };

  const handleOtpVerified = () => {
    setFormType('setNewPassword');
  };

  return (
    <div>
      {formType === 'requestOtp' && <ForgetPassword onOtpRequested={handleOtpRequested} />}
      {formType === 'verifyOtp' && <VerifyOtp setFormType={setFormType} email={email} />}
      {formType === 'setNewPassword' && <SetNewPassword email={email} />}
    </div>
  );
};

export default ForgetPasswordPage;
