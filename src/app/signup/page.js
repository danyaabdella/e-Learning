// src/pages/auth/signup.js
//'use client'
// import Signup from '../../Components/Signup';

// export default function SignupPage() {
//   return <Signup setFormType={setFormType}/>;
// }
import Signup from '../../Components/Signup';
import { useState } from 'react';

//const Signup = dynamic(() => import('@/Components/Signup'), { ssr: false });

 const SignupPage = () => {
  const [formType, setFormType] = useState('signup');

  return <Signup setFormType={setFormType} />;
}
export default SignupPage;
