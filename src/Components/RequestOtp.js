// // components/RequestOtp.js
// import { useState } from 'react';
// import axios from 'axios';
// import '../styles/auth.css';
// //import verifyOtp from '@/pages/api/auth/forgetpassword/verifyOtp';

//   const RequestOtp = ({ setFormType, setEmail }) => {
//   const [email, setEmailLocal] = useState('');
//   // let setEmail ;
//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('/api/auth/forgetpassword/requestOtp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });
//       //await axios.post('/api/auth/forgetpassword/requestOtp', { email: email });
//       if (!res.ok) {
//         throw new Error(`Error sending OTP: ${response.status} ${response.statusText}`);
//       }
//       alert('OTP sent to your email');
//       // setEmail(email); // Save email to state
//       // setFormType('verifyOtp');
//      window.location.href = '/forgetpassword'
//     } catch (error) {
//       console.log('Error sending OTP:', error.message);
//     }
//   };

//   return (
//     <div className="center">
//         <form onSubmit={handleRequestOtp} className="form-container">
//         <div>
//             <label className="label">Enter your email</label>
//             <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmailLocal(e.target.value)}
//             className="input-field"
//             required
//             />
//         </div>
//         <button type="submit" className="submit-button" >
//             Request OTP
//         </button>
//         </form>
//     </div>
//   );
// };

// export default RequestOtp;
import { useState } from 'react';

const RequestOtp = ({ onOtpRequested }) => {
  const [email, setEmail] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/forgetpassword/requestOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Error sending OTP');
      }

      alert('OTP sent to your email');
      onOtpRequested(email); // Pass the email to the parent component
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  return (
    <form onSubmit={handleRequestOtp} className="form-container">
      <div>
        <label className="label">Enter your email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="submit-button">Request OTP</button>
    </form>
  );
};

export default RequestOtp;
