'use client'
import '../styles/welcom.css';
import { useState } from 'react';
//import {useRouter} from 'next/router';
//import Link from 'next/link';
import Signup from '@/Components/Signup';
import Signin from '@/Components/Signin';
import RequestOtp from '@/Components/RequestOtp';
import VerifyOtp from '@/Components/VerifyOtp';
import SetNewPassword from '@/Components/SetNewPassword';

 export default function Home () {
  const [formType, setFormType] = useState('signin');
  const [email, setEmail] = useState('');
  //const router = useRouter();
  return (
    <div className="welcome">
      <h1 className="header">Welcome</h1>
      <div className="body">
      {/* <Link href="../signin">Signin</Link>
      {console.log('')}
      <Link href="../signup">Signup</Link> */}
       {formType === 'signin' && <Signin setFormType={setFormType} />}
        {formType === 'signup' && <Signup setFormType={setFormType} />}
        {formType === 'requestOtp' && <RequestOtp setFormType={setFormType} setEmail={setEmail} />}
        {formType === 'verifyOtp' && <VerifyOtp setFormType={setFormType} email={email} />}
        {formType === 'setNewPassword' && <SetNewPassword setFormType={setFormType} email={email} />}
      </div>
    </div>
  );
};

// export default Home;
