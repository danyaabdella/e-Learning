 //'use client'
import Signin from '../../Components/Signin';
import { useState } from 'react';

const SigninPage = () => {
  const [formType, setFormType] = useState('signin');
  return <Signin setFormType={setFormType}/>;
}
export default SigninPage;