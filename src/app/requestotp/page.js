
'use client'
import { useState } from 'react';
import  RequestOtp from '@/Components/RequestOtp';
import VerifyOtp from '@/Components/VerifyOtp';
import SetNewPassword from '@/Components/SetNewPassword';

const RequestOtpPage = () => {
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
      {formType === 'requestOtp' && <RequestOtp onOtpRequested={handleOtpRequested} />}
      {formType === 'verifyOtp' && <VerifyOtp setFormType={setFormType} email={email} />}
      {formType === 'setNewPassword' && <SetNewPassword email={email} />}
    </div>
  );
};

export default RequestOtpPage;
