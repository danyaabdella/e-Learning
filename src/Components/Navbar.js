// 'use client'
// import Link from 'next/link';
// import '../styles/nav.css';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// export default function Navbar() {
//   const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin
//   const [isUser, setIsUser] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         setIsAdmin(false);
//         return;
//     }

//     fetch('/api/auth/login', {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.user && data.user.role === 'admin') {
//             setIsAdmin(true);
//         } else if(data.user && data.user.role === 'user') {
//             setIsUser(true);
//         } else {
//             setIsAdmin(false);
//       }
        
//     })
//     .catch(error => {
//         console.error('Error fetching user data:', error);
//         setIsAdmin(false);
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAdmin(false);
//     window.location.href = '/';
//   };

//   return (
//     <nav className="nav">
//       <div className="contain">
//         <div className="nav-text">
//           <Image src="/logo.png" alt="E-learning" width={80} height={50} />
//         </div>
//         <div className="text-space">
//           <Link href='/'>Home</Link>
//           <Link href='/courses'>Courses</Link>
//           <Link href='/about'>About</Link>
//           <Link href='/contact'>Contact</Link>
//           {isAdmin ? (
//             // If admin, show circular profile icon with dropdown menu
//             <div className="profile-icon">
//               <div className="circle">
//                 <i className="fas fa-user" />
//               </div>
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link href="/adminPage">My Courses</Link>
//                 </li>
//                 <li>
//                   <Link href="/dashboard">Dashboard</Link>
//                 </li>
//                 <li>
//                   <Link href="/accountSetting">Account setting</Link>
//                 </li>
//                 <li>
//                   <Link href="#" onClick={handleLogout}>Logout</Link> {/* Pass function reference */}
//                 </li>
//               </ul>
//             </div>
//           ) : isUser ? (
//             // If regular user, show user profile icon with dropdown menu
//             <div className="profile-icon">
//               <div className="circle">
//                 <i className="fas fa-user" />
//               </div>
//               <ul className="dropdown-menu">
//                 <li>
//                   <Link href="/mylearning">My Learning</Link>
//                 </li>
//                 <li>
//                   <Link href="/mylearning">My Purchases</Link>
//                 </li>
//                 <li>
//                   <Link href="/wishlist">Wishlist</Link>
//                 </li>
//                 <li>
//                   <Link href="/accountSetting">Account Settings</Link>
//                 </li>
//                 <li>
//                   <Link href="#" onClick={handleLogout}>Logout</Link>
//                 </li>
//               </ul>
//             </div>
//           ):(
//             // If not admin, show register/signin links
//             <Link href="/signup">Register/Signin</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
'use client'; // This directive ensures the component runs on the client-side

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Import the custom hook for CartContext
import '../styles/nav.css';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const { cartItems } = useCart(); // Access cartItems from context

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAdmin(false);
      return;
    }

    fetch('/api/auth/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.user && data.user.role === 'admin') {
          setIsAdmin(true);
        } else if (data.user && data.user.role === 'user') {
          setIsUser(true);
        } else if (data.user && data.user.role === 'instructor') {
          setIsInstructor(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsAdmin(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('Email');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <nav className="nav">
      <div className="contain">
        <div className="nav-text">
          <Image src="/logo.png" alt="E-learning" width={80} height={50} />
        </div>
        <div className="text-space">
          <Link href='/'>Home</Link>
          <Link href='/courses'>Courses</Link>
          <Link href='/about'>About</Link>
          <Link href='/contact'>Contact</Link>
          <Link legacyBehavior href="/cart">
            <a className="relative">
              <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-2 13H5L3 3z" />
              </svg>
              <span id="cart-count" className="cart-span">
                {cartItems.length}
              </span>
            </a>
          </Link>
          {isAdmin ? (
            <div className="profile-icon">
              <div className="circle">
                <i className="fas fa-user" />
              </div>
              <ul className="dropdown-menu">
                <li><Link href="/adminPage">My Courses</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/accountSetting">Account setting</Link></li>
                <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          ) : isUser ? (
            <div className="profile-icon">
              <div className="circle">
                <i className="fas fa-user" />
              </div>
              <ul className="dropdown-menu">
                <li><Link href="/mylearning">My Learning</Link></li>
                <li><Link href="/mylearning">My Purchases</Link></li>
                <li><Link href="/wishlist">Wishlist</Link></li>
                <li><Link href="/accountSetting">Account Settings</Link></li>
                <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          ) : isInstructor? (
            <div className="profile-icon">
            <div className="circle">
              <i className="fas fa-user" />
            </div>
            <ul className="dropdown-menu">
              <li><Link href="/adminPage">My Courses</Link></li>
              <li><Link href="/mylearning">My Learning</Link></li>
              <li><Link href="/wishlist">Wishlist</Link></li>
              <li><Link href="/accountSetting">Account Settings</Link></li>
              <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
          ):(
            <Link href="/signup">Register/Signin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

