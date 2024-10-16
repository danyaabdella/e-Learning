'use client'

import { useEffect } from 'react';
import Signup from '../../Components/Signup';
import Signin from '../../Components/Signin';
import '../../styles/auth.css';

const SignupPage = () => {

  useEffect(() => {
    // Check if the page has already been reloaded
    if (!sessionStorage.getItem('reloaded')) {
      // Set a flag in sessionStorage to mark the page as reloaded
      sessionStorage.setItem('reloaded', 'true');
      // Reload the page
      window.location.reload();
    }
  }, []);

  return (
    <div className="left">
        <div className="right">
          <Signin setFormType={'signin'} />
        </div>
        <div className="right">
          <Signup setFormType={'signup'} />
        </div>
    </div>
  );
}

export default SignupPage;
