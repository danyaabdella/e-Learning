// // components/SetNewPassword.js
// import { useState } from 'react';
// import axios from 'axios';
// import '../styles/auth.css';

// const SetNewPassword = ({ email, setFormType }) => {
//   const [newPassword, setNewPassword] = useState('');

//   const handleSetNewPassword = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch('/api/auth/forgetpassword/setNewPassword', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, newPassword }),
//       });
//       //await axios.post('/api/auth/forgetpassword/setNewPassword', { email, newPassword });
//       alert('Password reset successful');
//       setFormType('signin');
//     } catch (error) {
//       alert('Error resetting password');
//     }
//   };

//   return (
//     <form onSubmit={handleSetNewPassword} className="form-container">
//       <div>
//         <label className="label">New Password</label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="input-field"
//           required
//         />
//       </div>
//       <button type="submit" className="submit-button">
//         Set New Password
//       </button>
//     </form>
//   );
// };

// export default SetNewPassword;
import { useState } from 'react';

const SetNewPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/forgetpassword/setNewPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!res.ok) {
        throw new Error('Error resetting password');
      }

      alert('Password reset successful');
      // Optionally redirect to login or other page
      window.location.href = '/signin';
    } catch (error) {
      alert('Error resetting password');
    }
  };

  return (
    <form onSubmit={handleSetNewPassword} className="form-container">
      <div>
        <label className="label">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="submit-button">Set New Password</button>
    </form>
  );
};

export default SetNewPassword;
