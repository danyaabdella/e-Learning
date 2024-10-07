'use client'; // This directive ensures the component runs on the client-side

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// import { useCart } from './CartContext'; // Import the custom hook for CartContext
import '../styles/nav.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
 // const { cartItems } = useCart(); // Access cartItems from context
  const [cartCount, setCartCount] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profile, setProfile] = useState({ avatar: '', email: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAdmin(false);
      return;
    }

    fetch('/api/auth/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      // .then(data => {
      //   if (data.user && data.user.role === 'admin') setIsAdmin(true);
      //   else if (data.user && data.user.role === 'user') setIsUser(true);
      //   else if (data.user && data.user.role === 'instructor') setIsInstructor(true);
      //   else setIsAdmin(false);
      //   if (data.user && data.user.email) setIsSignedIn(true);
      // })
      .then(data => {
        if (data.user) {
          setIsSignedIn(true);
          setProfile(prev => ({ ...prev, email: data.user.email }));

          // Set roles
          if (data.user.role === 'admin') setIsAdmin(true);
          else if (data.user.role === 'user') setIsUser(true);
          else if (data.user.role === 'instructor') setIsInstructor(true);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsAdmin(false);
      });
    // Fetch avatar from profile API
    fetch('/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.avatar) {
          setProfile(prev => ({ ...prev, avatar: data.avatar }));
        }
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch cart items from localStorage or make an API call to get cart count
    const cartItems = localStorage.getItem('cartItems') || [];
    setCartCount(cartItems.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('Email');
    localStorage.removeItem('cartItems');
    setIsAdmin(false);
    window.location.href = '/';
  };
  const handleCartClick = () => {
    if (isSignedIn) {
      window.location.href = '/cartPage'; // Redirect to cart page if signed in
    } else {
      window.location.href = '/signup'; // Redirect to sign-in page if not signed in
    }
  };

  const toggleMenu = () => {
    console.log('ccc');
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="contain">
        <div className="nav-text">
          <Image src="/logo.png" alt="E-learning" width={80} height={50} />
        </div>

         {/* Hamburger button */}
         <button
            className="hamburger"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

        <div className={`text-space ${isMenuOpen ? 'menuclosed' : 'menuopen'} `}>
          <Link className='link' href="/">Home</Link>
          <Link className='link' href="/courses">Courses</Link>
          <Link className='link' href="/about">About</Link>
          <Link className='link' href="/contact">Contact</Link>
          {/* <Link legacyBehavior href="/cartPage"> */}
            <a className="relative" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
              {/*<svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-2 13H5L3 3z" />
              </svg>*/}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cart-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

              <span id="cart-count" className="cart-span">
                {cartCount}
              </span>
            </a>
          {/* </Link> */}
          {isAdmin ? (
            <div className="profile-icon">
              {/* <div className="circle">
                <i className="fas fa-user" />
              </div> */}
              <Image src={profile.avatar} alt="Profile" width={40} height={40} className="circle" />
              <ul className="dropdown-menu">
                <li><Link href="/adminPage">My Courses</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/accountSetting">Account setting</Link></li>
                <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          ) : isUser ? (
            <div className="profile-icon">
              {/* <div className="circle">
                <i className="fas fa-user" />
              </div> */}
              <Image src={profile.avatar} alt="Profile" width={40} height={40} className="circle" />

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
            {/* <div className="circle">
              <i className="fas fa-user" />
            </div> */}
            <Image src={profile.avatar} alt="Profile" width={40} height={40} className="circle" />

            <ul className="dropdown-menu">
              <li><Link href="/adminPage">My Courses</Link></li>
              <li><Link href="/mylearning">My Learning</Link></li>
              <li><Link href="/wishlist">Wishlist</Link></li>
              <li><Link href="/accountSetting">Account Settings</Link></li>
              <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
          ):(
            <Link className='authLink' href="/signup">Register/Signin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

